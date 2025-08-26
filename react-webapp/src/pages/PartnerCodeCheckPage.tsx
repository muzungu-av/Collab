import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import OutlineButton from "../components/buttons/OutlineButton";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import OutlineInput from "../components/inputs/OutlineInput";
import TextBox from "../components/text_box/TextBox";
import FilledButton from "../components/buttons/FilledButton";

enum VerificationStatus {
  TRUE = "TRUE",
  UNDEFINED = "UNDEFINED",
  FALSE = "FALSE",
  BLOCKED = "BLOCKED",
}

const PartnerSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();
  const [inputValue, setInputValue] = useState<string>("");
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>(VerificationStatus.UNDEFINED);
  const [loginAttempts, setLoginAttempts] = useState<string>("");
  const [maxLoginAttempts, setMaxLoginAttempts] = useState<string>("");

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

      if (data && data.login_attempts) setLoginAttempts(data.login_attempts);
      if (data && data.maxLoginAttempts)
        setMaxLoginAttempts(data.maxLoginAttempts);

      if (data.blocked_automatically === false && data.is_active === true) {
        setVerificationStatus(VerificationStatus.TRUE);
      } else if (
        data.blocked_automatically === false &&
        data.is_active === false
      ) {
        setVerificationStatus(VerificationStatus.FALSE);
      } else if (
        data.blocked_automatically === true &&
        data.is_active === false
      ) {
        setVerificationStatus(VerificationStatus.BLOCKED);
      } else setVerificationStatus(VerificationStatus.FALSE);
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert(
        "Произошла ошибка, попробуйте еще раз. (" + JSON.stringify(error) + ")"
      );
    }
  };

  const handleClear = () => {
    setInputValue("");
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
          onClear={handleClear}
          textColor={
            verificationStatus === VerificationStatus.BLOCKED ||
            verificationStatus === VerificationStatus.FALSE
              ? "#ff5252"
              : "#ffffff"
          }
          placeholder="Ввести код"
        />

        {verificationStatus === VerificationStatus.UNDEFINED && (
          <OutlineButton onClick={handleCheckPassCode}>
            Проверить код
          </OutlineButton>
        )}

        {verificationStatus === VerificationStatus.TRUE && (
          <div>
            <br />
            <TextBox>✅ Верный код</TextBox>
            <br />
            <FilledButton onClick={handleNextStep}>
              Переход к регистрации
            </FilledButton>
          </div>
        )}

        {verificationStatus === VerificationStatus.FALSE && (
          <div>
            <br />
            <TextBox>❌ Неверный код</TextBox>
            <br />
            <TextBox>
              Попытка {loginAttempts} из {maxLoginAttempts}
            </TextBox>
            <br />
            <OutlineButton onClick={handleCheckPassCode}>
              Проверить код
            </OutlineButton>
          </div>
        )}

        {verificationStatus === VerificationStatus.BLOCKED && (
          <div>
            <br />
            <TextBox>❌ Неверный код</TextBox>
            <br />
            <div className="simple-text"> Вы были заблокированы.</div>
            <div className="simple-text"> Обратитесь в поддержку</div>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default PartnerSignUpPage;
