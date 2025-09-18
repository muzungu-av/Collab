-- Supabase не поддерживает классические SQL-транзакции через ORM
-- поэтому часто используем rpc для вызова хранимых процедур



-- Таблица admin
CREATE TABLE public.admin (
    telegram_id BIGINT PRIMARY KEY,
    hashed_password TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    username VARCHAR(50) NULL,
    email VARCHAR(100) NULL UNIQUE,
    phone VARCHAR(20) NULL UNIQUE
);

-- Таблица manager
CREATE TABLE public.manager (
    telegram_id BIGINT PRIMARY KEY,
    hashed_password TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    username VARCHAR(50) NULL,
    email VARCHAR(100) NULL UNIQUE,
    phone VARCHAR(20) NULL UNIQUE
);


-- Таблица partner
CREATE TABLE public.partner (
    telegram_id BIGINT PRIMARY KEY,
    hashed_password TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    username VARCHAR(50) NULL,
    email VARCHAR(100) NULL UNIQUE,
    phone VARCHAR(20) NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_automatically BOOLEAN NOT NULL DEFAULT FALSE,
    login_attempts INT NOT NULL DEFAULT 0,
    referral_link VARCHAR(16) NULL UNIQUE,
);



create index IF not exists idx_partner on public.partner using btree (telegram_id) TABLESPACE pg_default;
-- Таблица partner_passcode
CREATE TABLE public.partner_passcode (
    passcode VARCHAR(10) PRIMARY KEY,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    link_to_partner BIGINT NULL,
    FOREIGN KEY (link_to_partner) REFERENCES public.partner(telegram_id) ON DELETE CASCADE
);

--
-- Команды "CREATE POLICY..." (Создание политики RLS) Фильтрует строки в таблице на уровне строк (row-level)
-- Команды "GRANT..." Управляет правами доступа к объектам базы данных (таблицам, представлениям, функциям и т.д.).
-- Определяет, какие действия (SELECT, INSERT, UPDATE, DELETE, etc.) роль может выполнять над объектом.

ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manager ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_passcode ENABLE ROW LEVEL SECURITY;


-- РОЛИ
-- Создать роль admin
CREATE ROLE admin NOLOGIN;
-- Создать роль manager
CREATE ROLE manager NOLOGIN;
-- Создать роль partner
CREATE ROLE partner NOLOGIN;
-- Дать роль admin все права на таблицу admin
GRANT ALL PRIVILEGES ON TABLE public.admin TO admin;
-- Дать роль partner права на таблицы partner
GRANT SELECT, INSERT, UPDATE ON TABLE public.partner, public.partner_passcode TO admin, partner;
-- Дать роль manager права на таблицу manager
GRANT SELECT, INSERT, UPDATE ON TABLE public.manager TO admin, partner, manager;


-- ПОЛИТИКИ для ADMIN-ОВ
-- Для таблицы admin
CREATE POLICY "Admin full access to admin table"
ON public.admin
FOR ALL
TO admin
USING (true);

-- Для таблицы manager
CREATE POLICY "Admin full access to manager table"
ON public.manager
FOR ALL
TO admin
USING (true);

-- Для таблицы partner
CREATE POLICY "Admin full access to partner table"
ON public.partner
FOR ALL
TO admin
USING (true);

-- Для таблицы partner_passcode
CREATE POLICY "Admin full access to partner_passcode table"
ON public.partner_passcode
FOR ALL
TO admin
USING (true);



-- текущая политика RLS использует динамическое значение telegram_id, устанавливаемое с помощью current_setting('app.current_telegram_id').
-- Это позволяет устанавливать контекст пользователя на время сессии или транзакции.


-- ПОЛИТИКИ для PARTNER-ов
-- Для таблицы partner (только свои данные)
CREATE POLICY "Partner access to own data in partner table"
ON public.partner
FOR ALL
TO partner
USING (telegram_id = current_setting('app.current_telegram_id')::bigint);

-- Для таблицы partner_passcode (только свои записи)
CREATE POLICY "Partner access to own data in partner_passcode table"
ON public.partner_passcode
FOR ALL
TO partner
USING (link_to_partner = current_setting('app.current_telegram_id')::bigint);



-- ПОЛИТИКИ для MANAGER-ов
-- Для таблицы manager (только свои менеджеры)
CREATE POLICY "Partner access to own managers in manager table"
ON public.manager
FOR ALL
TO manager
USING (telegram_id = current_setting('app.current_telegram_id')::bigint);


-- RPC
/*
 * Функция handle_partner_passcode предназначена для обработки попыток ввода кода пользователем
 * и управления состоянием его учетной записи.
 *
 * Основные задачи функции:
 * 1. Проверка кода: Определяет, существует ли введенный код в таблице partner_passcode.
 * 2. Управление попытками входа:
 *    - Увеличивает счетчик попыток входа (login_attempts) при неправильном вводе кода.
 *    - Блокирует пользователя (blocked_automatically = true), если количество попыток
 *       достигает заданного максимума (max_login_attempts_param).
 * 3. Активация пользователя:
 *    - Если код введен правильно и пользователь не заблокирован, устанавливает is_active = true
 *      и связывает записи в таблицах partner и partner_passcode.
 * 4. Возврат результата: Возвращает статус операции, количество попыток, состояние блокировки
 *      и активности пользователя.
 *
 * Функция гарантирует, что пользователь не сможет войти в систему после превышения максимального
 *   числа попыток ввода кода, даже если он введет правильный код.
 */
CREATE OR REPLACE FUNCTION public.handle_partner_passcode(
  telegram_id_param BIGINT,
  passcode_param VARCHAR(10),
  max_login_attempts_param INTEGER
)
RETURNS TABLE (
  telegram_id BIGINT,
  login_attempts INTEGER,
  blocked_automatically BOOLEAN,
  is_active BOOLEAN,
  status TEXT,
  success BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  passcode_exists BOOLEAN;
  partner_blocked BOOLEAN;
BEGIN
  -- Проверяем, существует ли свободный passcode
  SELECT EXISTS (SELECT 1 FROM public.partner_passcode pp WHERE pp.passcode = passcode_param AND pp.is_used = FALSE) INTO passcode_exists;
  -- Проверяем, заблокирован ли пользователь
  SELECT EXISTS (SELECT 1 FROM public.partner p WHERE p.telegram_id = telegram_id_param AND p.blocked_automatically) INTO partner_blocked;

  -- Обновляем или создаём пользователя
  RETURN QUERY
  WITH updated_partner AS (
    UPDATE public.partner p
    SET
      login_attempts = CASE WHEN NOT passcode_exists AND NOT partner_blocked THEN p.login_attempts + 1 ELSE p.login_attempts END,
      blocked_automatically = CASE
        WHEN NOT passcode_exists AND NOT partner_blocked THEN (p.login_attempts + 1 >= max_login_attempts_param)
        ELSE p.blocked_automatically
      END
    WHERE p.telegram_id = telegram_id_param
    RETURNING p.*
  ),
  inserted_partner AS (
    INSERT INTO public.partner (telegram_id, is_active, blocked_automatically, login_attempts)
    SELECT telegram_id_param, FALSE, FALSE, 1
    WHERE NOT EXISTS (SELECT 1 FROM public.partner p WHERE p.telegram_id = telegram_id_param)
    RETURNING *
  ),
  partner_check AS (
    SELECT * FROM updated_partner
    UNION ALL
    SELECT * FROM inserted_partner
  )
  -- Возвращаем актуальные данные пользователя
  SELECT
    pc.telegram_id,
    pc.login_attempts,
    pc.blocked_automatically,
    CASE
      WHEN passcode_exists AND NOT partner_blocked THEN TRUE
      ELSE pc.is_active
    END AS is_active,
    CASE
      WHEN pc.blocked_automatically THEN 'Превышено число попыток'
      WHEN NOT passcode_exists THEN 'Неверный passcode'
      ELSE 'ok'
    END AS status,
    CASE
      WHEN pc.blocked_automatically THEN FALSE
      WHEN NOT passcode_exists THEN FALSE
      ELSE TRUE
    END AS success
  FROM partner_check pc
  WHERE
    (pc.blocked_automatically AND pc.login_attempts >= max_login_attempts_param)
    OR
    (NOT passcode_exists AND pc.login_attempts < max_login_attempts_param AND NOT partner_blocked)
    OR
    (passcode_exists AND pc.login_attempts < max_login_attempts_param AND NOT partner_blocked);

  -- Если код верный и пользователь не заблокирован, активируем его
  IF passcode_exists AND NOT partner_blocked THEN
    UPDATE public.partner_passcode pp
    SET
      is_used = TRUE,
      link_to_partner = telegram_id_param
    WHERE pp.passcode = passcode_param;
    UPDATE public.partner p
    SET is_active = TRUE
    WHERE p.telegram_id = telegram_id_param AND NOT p.blocked_automatically;

    -- Возвращаем обновлённые данные
    RETURN QUERY
    SELECT
      p.telegram_id,
      p.login_attempts,
      p.blocked_automatically,
      p.is_active,
      'ok' AS status,
      TRUE AS success
    FROM public.partner p
    WHERE p.telegram_id = telegram_id_param;
  END IF;
END;
$$;

-- Добавление кошелька Wallet
-- типы кошельков
CREATE TABLE public.wallet_types (
    type_name VARCHAR(20) PRIMARY KEY,
    description TEXT NULL,
    icon_url TEXT NULL,
    fee_percentage DECIMAL(5, 2) NULL
);

INSERT INTO public.wallet_types (type_name, description)
VALUES
    ('TON', 'TON blockchain wallet');

CREATE TABLE public.wallets (
    id SERIAL PRIMARY KEY,
    manager_telegram_id BIGINT NULL REFERENCES public.manager(telegram_id) ON DELETE CASCADE,
    partner_telegram_id BIGINT NULL REFERENCES public.partner(telegram_id) ON DELETE CASCADE,
    wallet_address VARCHAR(64) NOT NULL,
    wallet_type VARCHAR(20) NOT NULL REFERENCES public.wallet_types(type_name),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    blocked_at TIMESTAMPTZ NULL,
    block_reason TEXT NULL,
    -- Ограничение: только одно из полей manager_telegram_id или partner_telegram_id может быть заполнено
    CONSTRAINT only_one_user_id CHECK (
        (manager_telegram_id IS NULL) != (partner_telegram_id IS NULL)
    )
);

--indexes
CREATE INDEX idx_admin ON public.admin(telegram_id);
CREATE INDEX idx_manager ON public.manager(telegram_id);
CREATE INDEX idx_partner ON public.partner(telegram_id);
CREATE INDEX idx_partner_passcode ON public.partner_passcode(passcode);

CREATE INDEX idx_wallets_manager ON public.wallets(manager_telegram_id);
CREATE INDEX idx_wallets_partner ON public.wallets(partner_telegram_id);
CREATE INDEX idx_wallets_address ON public.wallets(wallet_address);


-- пример вставки кошелька
-- INSERT INTO public.wallets (
--     partner_telegram_id,
--     wallet_address,
--     wallet_type
-- ) VALUES (
--     5924511624,
--     'UQC82HumQEpXU7tgxc4lmxfuwRINB8b8OOmWNVEkU3ROO9fN',
--     'TON'
-- );


-- Получить все кошельки с указанием типа пользователя
-- SELECT
--     w.*,
--     CASE
--         WHEN w.manager_telegram_id IS NOT NULL THEN 'manager'
--         WHEN w.partner_telegram_id IS NOT NULL THEN 'partner'
--     END AS user_type
-- FROM public.wallets w;


--Эта функция сохраняет telegram_id в параметре сессии app.current_telegram_id, который потом можно использовать в RLS-политиках.
CREATE OR REPLACE FUNCTION public.set_current_telegram_id(p_telegram_id BIGINT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM set_config('app.current_telegram_id', p_telegram_id::text, false);
END;
$$;


/*
 * завершает регистрацию partner вводятся атрибуты
 */

CREATE OR REPLACE FUNCTION public.update_partner_and_wallet(
  p_telegram_id BIGINT,
  p_username TEXT,
  p_email TEXT,
  p_wallet_address VARCHAR(64),
  p_wallet_type VARCHAR(20),
  p_referral_link VARCHAR(16)
)
RETURNS TABLE (
  result BOOLEAN,
  error_text TEXT,
  debug_info TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Логируем входные параметры
  debug_info := ARRAY[
    'Input parameters:',
    'p_telegram_id: ' || p_telegram_id,
    'p_username: ' || COALESCE(p_username, 'NULL'),
    'p_email: ' || COALESCE(p_email, 'NULL'),
    'p_wallet_address: ' || COALESCE(p_wallet_address, 'NULL'),
    'p_wallet_type: ' || COALESCE(p_wallet_type, 'NULL'),
    'p_referral_link: ' || COALESCE(p_referral_link, 'NULL')
  ];

  -- Устанавливаем контекст пользователя для RLS
  PERFORM set_current_telegram_id(p_telegram_id);

  BEGIN
    -- Обновляем данные партнёра
    UPDATE public.partner
    SET
      username = p_username,
      email = p_email,
      referral_link= p_referral_link
    -- тут важно сравнивать telegram_id из таблицы а не из параметра функции (p_telegram_id)
    WHERE telegram_id = current_setting('app.current_telegram_id')::bigint;

    -- Вставляем запись в wallets
    INSERT INTO public.wallets (
      partner_telegram_id,
      wallet_address,
      wallet_type
    ) VALUES (
      p_telegram_id,
      p_wallet_address,
      p_wallet_type
    );

    -- Возвращаем успешный результат
    RETURN QUERY SELECT
      TRUE as result,
      NULL as error_text,
      array_cat(
        debug_info,
        ARRAY[
          'Rows updated in partner: ' || COALESCE(FOUND::TEXT, '0'),
          'Insert into wallets successful'
        ]
      ) as debug_info;
  EXCEPTION WHEN OTHERS THEN
    -- Возвращаем ошибку
    RETURN QUERY SELECT
      FALSE as result,
      SQLERRM as error_text,
      array_cat(
        debug_info,
        ARRAY['Error: ' || SQLERRM]
      ) as debug_info;
  END;
END;
$$;

-- включаем RLS
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partner can manage their own wallets"
ON public.wallets
FOR ALL
USING (
  partner_telegram_id = current_setting('app.current_telegram_id')::bigint
);


-- связь менеджер - парнер

--В таблице partner поле referral_link будет уникальным.
--В таблице manager поле partner_referral_link будет ссылаться на referral_link в таблице partner.
--Если партнер удаляется, то у всех его менеджеров поле partner_referral_link станет NULL.
ALTER TABLE public.partner
ADD COLUMN referral_link VARCHAR(16) UNIQUE;


ALTER TABLE public.manager
ADD COLUMN partner_referral_link VARCHAR(16) NULL;
ALTER TABLE public.manager
ADD CONSTRAINT fk_manager_partner
FOREIGN KEY (partner_referral_link)
REFERENCES public.partner(referral_link)
ON DELETE SET NULL;



/*
* Функция ищет пользователя по telegram_id в таблицах admin, manager и partner и возвращает объединённый результат со всеми полями, 
* включая NULL для отсутствующих значений.
* Для таблицы partner учитываются только активные (is_active = true) и не заблокированные (blocked_automatically = false) пользователи.
*/
CREATE OR REPLACE FUNCTION public.find_any_user_by_telegram_id(telegram_id_param BIGINT)
RETURNS TABLE (
    telegram_id BIGINT,
    created_at TIMESTAMPTZ,
    username VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN,
    blocked_automatically BOOLEAN,
    login_attempts INTEGER,
    referral_link VARCHAR(16),
    partner_referral_link VARCHAR(16),
    user_type TEXT,
    -- Поля из wallets
    wallet_address VARCHAR(64),
    wallet_type VARCHAR(20),
    wallet_is_active BOOLEAN,
    wallet_is_verified BOOLEAN,
    wallet_blocked_at TIMESTAMPTZ,
    wallet_block_reason TEXT
) AS $$
BEGIN
    RETURN QUERY
    -- Админы
    SELECT
        a.telegram_id,
        a.created_at,
        a.username,
        a.email,
        a.phone,
        NULL::BOOLEAN AS is_active,
        NULL::BOOLEAN AS blocked_automatically,
        NULL::INTEGER AS login_attempts,
        NULL::VARCHAR(16) AS referral_link,
        NULL::VARCHAR(16) AS partner_referral_link,
        'admin' AS user_type,
        NULL::VARCHAR(64) AS wallet_address,
        NULL::VARCHAR(20) AS wallet_type,
        NULL::BOOLEAN AS wallet_is_active,
        NULL::BOOLEAN AS wallet_is_verified,
        NULL::TIMESTAMPTZ AS wallet_blocked_at,
        NULL::TEXT AS wallet_block_reason
    FROM public.admin a
    WHERE a.telegram_id = telegram_id_param
    UNION ALL
    -- Менеджеры
    SELECT
        m.telegram_id,
        m.created_at,
        m.username,
        m.email,
        m.phone,
        NULL::BOOLEAN AS is_active,
        NULL::BOOLEAN AS blocked_automatically,
        NULL::INTEGER AS login_attempts,
        NULL::VARCHAR(16) AS referral_link,
        m.partner_referral_link,
        'manager' AS user_type,
        w.wallet_address,
        w.wallet_type,
        w.is_active AS wallet_is_active,
        w.is_verified AS wallet_is_verified,
        w.blocked_at AS wallet_blocked_at,
        w.block_reason AS wallet_block_reason
    FROM public.manager m
    LEFT JOIN public.wallets w ON m.telegram_id = w.manager_telegram_id
    WHERE m.telegram_id = telegram_id_param
    UNION ALL
    -- Партнёры
    SELECT
        p.telegram_id,
        p.created_at,
        p.username,
        p.email,
        p.phone,
        p.is_active,
        p.blocked_automatically,
        p.login_attempts,
        p.referral_link,
        NULL::VARCHAR(16) AS partner_referral_link,
        'partner' AS user_type,
        w.wallet_address,
        w.wallet_type,
        w.is_active AS wallet_is_active,
        w.is_verified AS wallet_is_verified,
        w.blocked_at AS wallet_blocked_at,
        w.block_reason AS wallet_block_reason
    FROM public.partner p
    LEFT JOIN public.wallets w ON p.telegram_id = w.partner_telegram_id
    WHERE p.telegram_id = telegram_id_param;
END;
$$ LANGUAGE plpgsql;


/* удаляет партнера по его telegram_id*/
CREATE OR REPLACE FUNCTION public.delete_partner_by_telegram_id(p_telegram_id BIGINT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Устанавливаем контекст RLS (например, telegram_id текущего пользователя)
    PERFORM set_current_telegram_id(p_telegram_id);

    -- Удаляем запись (RLS автоматически применит фильтрацию)
    DELETE FROM public.partner
    WHERE telegram_id = p_telegram_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



--связываем менеджера и партнера
ALTER TABLE public.manager
ADD COLUMN partner_referral_link VARCHAR(16);

ALTER TABLE public.manager
ADD CONSTRAINT fk_partner_referral_link
FOREIGN KEY (partner_referral_link)
REFERENCES partner(referral_link);


CREATE OR REPLACE FUNCTION public.insert_manager_with_wallet(
  manager_telegram_id BIGINT,
  wallet_address VARCHAR(64),
  wallet_type VARCHAR(20),
  manager_hashed_password TEXT DEFAULT NULL,
  manager_username VARCHAR(50) DEFAULT NULL,
  manager_email VARCHAR(100) DEFAULT NULL,
  manager_partner_referral_link VARCHAR(16) DEFAULT NULL
)
RETURNS TABLE (
  result BOOLEAN,
  manager_id BIGINT,
  error_text TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Проверяем, передан ли manager_partner_referral_link и не является ли он пустой строкой
  IF manager_partner_referral_link IS NOT NULL AND manager_partner_referral_link <> '' THEN
    -- Проверяем, существует ли такое значение в таблице partner
    IF NOT EXISTS (SELECT 1 FROM public.partner WHERE referral_link = manager_partner_referral_link) THEN
      RETURN QUERY SELECT FALSE AS result, NULL::BIGINT, 'Указанная партнёрская ссылка не существует'::TEXT;
      RETURN;
    END IF;
  END IF;

  -- Проверка существования wallet_type
  IF NOT EXISTS (SELECT 1 FROM public.wallet_types WHERE type_name = wallet_type) THEN
    RETURN QUERY SELECT FALSE AS result, NULL::BIGINT, 'Указанный тип кошелька не поддерживается'::TEXT;
    RETURN;
  END IF;

  -- Вставка записи в таблицу manager
  BEGIN
    INSERT INTO public.manager (
      telegram_id,
      hashed_password,
      username,
      email,
      partner_referral_link
    )
    VALUES (
      manager_telegram_id,
      manager_hashed_password,
      manager_username,
      manager_email,
      -- Если manager_partner_referral_link пуст или NULL, записываем NULL
      CASE WHEN manager_partner_referral_link IS NULL OR manager_partner_referral_link = '' THEN NULL ELSE manager_partner_referral_link END
    );
  EXCEPTION
    WHEN unique_violation THEN
      RETURN QUERY SELECT FALSE AS result, NULL::BIGINT, 'telegram_id или email уже существуют'::TEXT;
      RETURN;
  END;

  -- Вставка записи в таблицу wallets
  BEGIN
    INSERT INTO public.wallets (
      manager_telegram_id,
      wallet_address,
      wallet_type
    )
    VALUES (
      manager_telegram_id,
      wallet_address,
      wallet_type
    );
  EXCEPTION
    WHEN OTHERS THEN
      RETURN QUERY SELECT FALSE AS result, NULL::BIGINT, 'Ошибка при добавлении кошелька: ' || SQLERRM::TEXT;
      RETURN;
  END;

  RETURN QUERY SELECT TRUE AS result, manager_telegram_id, NULL::TEXT;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY SELECT FALSE AS result, NULL::BIGINT, 'Ошибка: ' || SQLERRM::TEXT;
END;
$$;


CREATE TABLE app_constants (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Добавляем  константу стоимости подписки
INSERT INTO app_constants (key, value, description)
VALUES (
  'subscription_price_yearly',
  '{"amount": 49, "currency": "EUR"}',
  'Цена ежегодной подписки'
);

-- -- Политика для MANADER таблицы wallets (SELECT, UPDATE, DELETE)
-- -- Политика для SELECT
-- CREATE POLICY manager_select_wallet_policy ON public.wallets
--     FOR SELECT
--     USING (manager_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT);

-- -- Политика для UPDATE
-- CREATE POLICY manager_update_wallet_policy ON public.wallets
--     FOR UPDATE
--     USING (manager_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT)
--     WITH CHECK (manager_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT);

-- -- Политика для DELETE
-- CREATE POLICY manager_delete_wallet_policy ON public.wallets
--     FOR DELETE
--     USING (manager_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT);


-- -- Политика для PARTNER (SELECT, UPDATE, DELETE)
-- -- Политика для SELECT
-- CREATE POLICY partner_select_wallet_policy ON public.wallets
--     FOR SELECT
--     USING (partner_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT);

-- -- Политика для UPDATE
-- CREATE POLICY partner_update_wallet_policy ON public.wallets
--     FOR UPDATE
--     USING (partner_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT)
--     WITH CHECK (partner_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT);

-- -- Политика для DELETE
-- CREATE POLICY partner_delete_wallet_policy ON public.wallets
--     FOR DELETE
--     USING (partner_telegram_id = current_setting('app.current_user_telegram_id')::BIGINT);



-- -- Политика для ADMIN (SELECT, UPDATE, DELETE)
-- -- Политика для SELECT
-- CREATE POLICY admin_select_wallet_policy ON public.wallets
--     FOR SELECT
--     USING (true);

-- -- Политика для UPDATE
-- CREATE POLICY admin_update_wallet_policy ON public.wallets
--     FOR UPDATE
--     USING (true)
--     WITH CHECK (true);

-- -- Политика для DELETE
-- CREATE POLICY admin_delete_wallet_policy ON public.wallets
--     FOR DELETE
--     USING (true);





-- промпт
-- сейчас я настраиваю RLS запросы на вставку данных (insert) в таблицу ... ,
-- которые будут от имени service_role, обходит Row Level Security,
-- то есть от имени бакенда. но чтение и изменение будут от имени пользователей
-- с ролями (admin, partner, manager) вот для этого сделай команды для таблицы wallets.
-- и я не настроил не использую  auth.uid() а вместо этого использую current_setting (настройка сессии)
