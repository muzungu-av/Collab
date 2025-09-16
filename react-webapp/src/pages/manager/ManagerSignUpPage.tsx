import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { useAuthUser } from "../../context/UserContext";
import OutlineInput from "../../components/inputs/OutlineInput";
import FilledButton from "../../components/buttons/FilledButton";
import { encodeTelegramId } from "../../utils/RequestEncoder";
import { ResponseDto } from "../../types";

const ManagerSignUpPage: React.FC = () => {
  const { baseApiUrl, getTelegramId } = useAuthUser();
  const [inputFIO, setInputFIO] = useState<string>("");
  const [inputEMAIL, setInputEMAIL] = useState<string>("");
  const [inputWALLET, setInputWALLET] = useState<string>("");
  const [inputReferalCode, setInputReferalCode] = useState<string>("");

  const handleClearFIO = () => {
    setInputFIO("");
  };
  const handleClearEMAIL = () => {
    setInputEMAIL("");
  };
  const handleClearWALLET = () => {
    setInputWALLET("");
  };

  const handleClearReferalCode = () => {
    setInputReferalCode("");
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
        telegram_id: telegramId,
        signed_id: signed,
        fio: inputFIO,
        email: inputEMAIL,
        wallet: inputWALLET,
        wallet_type: "TON",
        partner_referral_link: inputReferalCode || "", // null и пустая строка эквивалентны в функции на стороне БД
      });

      const response = await fetch(`${baseApiUrl}/api/manager/signup`, {
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
        // Перенаправляем на главную страницу
        window.location.href = "/";
      } else {
        // Ошибка регистрации
        alert(`Ошибка: ${result.message || "Неизвестная ошибка"}`);
        window.location.href = "/";
      }
    } catch (error: unknown) {
      // Проверяем, является ли ошибка экземпляром Error
      if (error instanceof Error) {
        alert(`Произошла ошибка: ${error.message}`);
      } else {
        alert("Произошла неизвестная ошибка");
      }
      window.location.href = "/";
    }
  };

  return (
    <CommonLayout showBackButton={false}>
      <div>
        <div className="welcome-text">Регистрация менеджера</div>
        <br />
        <div className="simple-text">Пожалуйста, заполните поля</div>
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
        <OutlineInput
          value={inputReferalCode}
          onChange={(e) => setInputReferalCode(e.target.value)}
          onClear={handleClearReferalCode}
          textColor="#FFFFFF"
          placeholder="Номер партнера (если есть)"
        />
        <br />
        <FilledButton onClick={handler}>Зарегистрроваться</FilledButton>
      </div>
    </CommonLayout>
  );
};

export default ManagerSignUpPage;
