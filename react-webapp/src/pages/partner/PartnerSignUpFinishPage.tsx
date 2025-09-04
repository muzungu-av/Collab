import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/UserContext";
import OutlineInput from "../../components/inputs/OutlineInput";
import FilledButton from "../../components/buttons/FilledButton";
import { encodeTelegramId } from "../../utils/RequestEncoder";

const PartnerSignUpFinishPage: React.FC = () => {
  const navigate = useNavigate();
  const { authUser, baseApiUrl, updateAuthUser } = useAuthUser();
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
    // Проверяем наличие всех необходимых данных перед отправкой
    if (!authUser?.telegram_id || !inputFIO || !inputEMAIL || !inputWALLET) {
      alert("Некорректные данные пользователя или код.");
      return;
    }
    try {
      const signed = encodeTelegramId(authUser.telegram_id);
      const userData = JSON.stringify({
        fio: inputFIO,
        email: inputEMAIL,
        wallet: inputWALLET,
        telegram_id: authUser?.telegram_id,
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
      const r = await response.json();
      if (
        Array.isArray(r.result) &&
        r.result[0]?.result === false &&
        r.result[0]?.error_text
      ) {
        alert(
          "Произошла ошибка обновления данных: (" +
            JSON.stringify(r.result[0]?.error_text) +
            ")\nВозможно email,phone уже существуют."
        );

        /* удаляем недоконца создавшегося пользователя-партнера */
        try {
          await removeUserData(authUser?.telegram_id, signed);
        } catch (error) {
          alert("Ошибка во время отмены операции:" + error);
        }
        window.location.href = "/";
      } else if (Array.isArray(r.result) && r.result[0]?.result === false) {
        alert(
          "Произошла ошибка обновления данных. Возможно email,phone уже существуют."
        );
        /* удаляем недоконца создавшегося пользователя-партнера */
        await removeUserData(authUser?.telegram_id, signed);
        window.location.href = "/";
      }

      /* ПРОДОЛЖАЕМ перезагрузим  - это вызовет автовход на партнера */
      if (Array.isArray(r.result) && r.result[0]?.result === true) {
        alert("Данные сохранены");
        window.location.href = "/"; //произойдет автовход на страницу партнера
      }
    } catch (error) {
      alert("Произошла ошибка, попробуйте еще раз - " + JSON.stringify(error));
      window.location.href = "/";
    }
  };

  //todo по использованному коду можно еще раз зайти

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
