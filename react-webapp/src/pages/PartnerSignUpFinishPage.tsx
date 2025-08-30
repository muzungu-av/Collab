import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import OutlineInput from "../components/inputs/OutlineInput";
import FilledButton from "../components/buttons/FilledButton";
import { encodeTelegramId } from "../utils/RequestEncoder";

const PartnerSignUpFinishPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();
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
  const handler = async () => {
    // Проверяем наличие всех необходимых данных перед отправкой
    if (!user?.id || !inputFIO || !inputEMAIL || !inputWALLET) {
      alert("Некорректные данные пользователя или код.");
      return;
    }
    try {
      let r = encodeTelegramId(String(user?.id));
      const userData = JSON.stringify({
        fio: inputFIO,
        email: inputEMAIL,
        wallet: inputWALLET,
        telegram_id: user?.id,
        wallet_type: "TON",
        signed_id: r,
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

      await response.json();
      alert("Данные сохранены");
      navigate("/partner");
    } catch (error) {
      alert("Произошла ошибка, попробуйте еще раз");
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
