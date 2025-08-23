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
    phone VARCHAR(20) NULL UNIQUE
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_automatically BOOLEAN NOT NULL DEFAULT FALSE,
    login_attempts INT NOT NULL DEFAULT 0
);

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
-- Для таблицы manager (только свои менеджеры, если применимо)
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
  -- Проверяем, существует ли passcode
  SELECT EXISTS (SELECT 1 FROM public.partner_passcode pp WHERE pp.passcode = passcode_param) INTO passcode_exists;

  -- Проверяем, заблокирован ли пользователь
  SELECT EXISTS (SELECT 1 FROM public.partner p WHERE p.telegram_id = telegram_id_param AND p.blocked_automatically) INTO partner_blocked;

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
  SELECT
    pc.telegram_id,
    pc.login_attempts,
    pc.blocked_automatically,
    pc.is_active,
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

  IF passcode_exists AND NOT partner_blocked THEN
    UPDATE public.partner_passcode pp
    SET
      is_used = TRUE,
      link_to_partner = telegram_id_param
    WHERE pp.passcode = passcode_param;

    UPDATE public.partner p
    SET is_active = TRUE
    WHERE p.telegram_id = telegram_id_param AND NOT p.blocked_automatically;

    RETURN QUERY
    SELECT
      p.telegram_id,
      p.login_attempts,
      p.blocked_automatically,
      p.is_active,
      'ok' AS status,
      TRUE AS success
    FROM public.partner p
    WHERE p.telegram_id = telegram_id_param AND NOT p.blocked_automatically;
  END IF;
END;
$$;
