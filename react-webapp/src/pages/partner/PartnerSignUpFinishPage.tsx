import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { useAuthUser } from "../../context/UserContext";
import OutlineInput from "../../components/inputs/OutlineInput";
import FilledButton from "../../components/buttons/FilledButton";
import { encodeTelegramId } from "../../utils/RequestEncoder";
import { ResponseDto } from "../../types";

const PartnerSignUpFinishPage: React.FC = () => {
  const { baseApiUrl, getTelegramId } = useAuthUser();
  const [inputFIO, setInputFIO] = useState<string>("");
  const [inputEMAIL, setInputEMAIL] = useState<string>("");
  const [inputWALLET, setInputWALLET] = useState<string>("");

  const handleClearFIO = () => {
    setInputFIO("");
  };
  const handleClearEMAIL = () => {
    setInputEMAIL("");
  };
  const handleClearWALLET = () => {
    setInputWALLET("");
  };

  const removeUserData = async (telegram_id: number, signed: string) => {
    const userData = JSON.stringify({
      telegram_id: telegram_id,
      signed_id: signed,
    });

    const currentUrl = window.location.origin;
    const response = await fetch(`${currentUrl}/api/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      alert("Изменения не сохранены");
    }
  };

  const handler = async () => {
    let telegramId = getTelegramId();
    // Проверяем наличие всех необходимых данных перед отправкой
    if (!telegramId || !inputFIO || !inputEMAIL || !inputWALLET) {
      alert("Некорректные данные пользователя или код.");
      return;
    }
    try {
      const signed = encodeTelegramId(telegramId!);
      const userData = JSON.stringify({
        fio: inputFIO,
        email: inputEMAIL,
        wallet: inputWALLET,
        telegram_id: telegramId,
        wallet_type: "TON",
        signed_id: signed,
      });
      const response = await fetch(`${baseApiUrl}/api/partner/signup`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Получаем ответ от сервера в формате ResponseDto
      const result: ResponseDto<{ token?: string }> = await response.json();
      // Проверяем результат
      if (result.success) {
        // Успешная регистрация
        alert("Регистрация прошла успешно!");
        // Если есть токен, сохраняем его
        if (result.token) {
          localStorage.setItem("authToken", result.token);
        }
        window.location.href = "/"; //произойдет автовход на страницу партнера
      } else {
        // Ошибка регистрации
        alert(`Ошибка: ${result.message || "Неизвестная ошибка"}`);
        /* удаляем недоконца создавшегося пользователя-партнера */
        try {
          await removeUserData(telegramId!, signed);
        } catch (error) {
          alert("Ошибка во время отмены операции:" + error);
        }
        window.location.href = "/";
      }
    } catch (error) {
      alert("Произошла ошибка, попробуйте еще раз - " + JSON.stringify(error));
      window.location.href = "/";
    }
  };

  return (
    <CommonLayout showBackButton={false}>
      <div>
        <div className="welcome-text">Регистрация партнёра</div>
        <br />
        <div className="simple-text">Пожалуйста, заполните данные для</div>
        <div className="simple-text">участия в партнёрской программе</div>
        <br />
        <OutlineInput
          value={inputFIO}
          onChange={(e) => setInputFIO(e.target.value)}
          onClear={handleClearFIO}
          textColor="#FFFFFF"
          placeholder="ФИО"
        />
        <OutlineInput
          value={inputEMAIL}
          onChange={(e) => setInputEMAIL(e.target.value)}
          onClear={handleClearEMAIL}
          textColor="#FFFFFF"
          placeholder="Email"
        />
        <OutlineInput
          value={inputWALLET}
          onChange={(e) => setInputWALLET(e.target.value)}
          onClear={handleClearWALLET}
          textColor="#FFFFFF"
          placeholder="Номер кошелька (карта / криптовалюта)"
        />
        <br />
        <FilledButton onClick={handler}>Завершить регистрацию</FilledButton>
      </div>
    </CommonLayout>
  );
};

export default PartnerSignUpFinishPage;
