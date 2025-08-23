import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import OutlineButton from "../components/buttons/OutlineButton";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import OutlineInput from "../components/inputs/OutlineInput";

const PartnerSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();
  const [inputValue, setInputValue] = useState<string>("");

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
      console.log("Успешный ответ от сервера:", data);
      // Здесь можно добавить логику обработки успешного ответа, например:
      // navigate("/success-page");
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      // Здесь можно добавить логику обработки ошибки, например:
      // alert("Произошла ошибка, попробуйте еще раз.");
    }
  };

  return (
    <CommonLayout>
      <div>
        <div className="welcome-text">Введите код</div>
        <div>{`${baseApiUrl}/api/partner-passcode/check`}</div>
        <OutlineInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="**********"
        />
        <OutlineButton onClick={() => handleCheckPassCode()}>
          Проверить код
        </OutlineButton>
      </div>
    </CommonLayout>
  );
};

export default PartnerSignUpPage;
