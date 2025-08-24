import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import OutlineButton from "../components/buttons/OutlineButton";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import OutlineInput from "../components/inputs/OutlineInput";
import TextBox from "../components/text_box/TextBox";
import FilledButton from "../components/buttons/FilledButton";

const PartnerSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();
  const [inputValue, setInputValue] = useState<string>("");
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);

  const handleCheckPassCode = async () => {
    // Проверяем наличие всех необходимых данных перед отправкой
    if (!user?.id || !inputValue) {
      alert("Некорректные данные пользователя или код.");
      return;
    }
    try {
      const userData = JSON.stringify({
        passcode: inputValue,
        telegram_id: user.id,
      });
      const response = await fetch(`${baseApiUrl}/api/partner-passcode/check`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Проверяем ответ от сервера
      if (data.blocked_automatically === false && data.is_active === true) {
        setIsCodeVerified(true);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      // Здесь можно добавить логику обработки ошибки, например:
      // alert("Произошла ошибка, попробуйте еще раз.");
    }
  };

  const handleNextStep = () => {
    // Логика для следующего шага
    navigate("/partner-signupfinish");
  };

  return (
    <CommonLayout>
      <div>
        <div className="welcome-text">Введите код</div>
        <br />
        <br />
        <div className="simple-text">Пожалуйста, введите ваш</div>
        <div className="simple-text">уникальный код партнёра</div>
        <br />
        <OutlineInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="**********"
        />
        {!isCodeVerified ? (
          <OutlineButton onClick={handleCheckPassCode}>
            Проверить код
          </OutlineButton>
        ) : (
          <>
            <br />
            <TextBox>✅ Верный код</TextBox>

            <FilledButton onClick={handleNextStep}>
              Переход к регистрации
            </FilledButton>
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default PartnerSignUpPage;
