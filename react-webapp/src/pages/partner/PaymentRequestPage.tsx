import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import OutlineInput from "../../components/inputs/OutlineInput";
import FilledButton from "../../components/buttons/FilledButton";
import { useAuthUser } from "../../context/UserContext";

const PaymentRequestPage: React.FC = () => {
  const { authUser, baseApiUrl, getTelegramId } = useAuthUser();
  const [inputCash, setInputCash] = useState<string>("");
  const [inputEMAIL, setInputEMAIL] = useState<string>("");
  const handleClearCash = () => {
    setInputCash("");
  };
  const handleClearEMAIL = () => {
    setInputEMAIL("");
  };

  const handle = () => {
    if (!inputCash || isNaN(Number(inputCash)) || Number(inputCash) <= 0) {
      alert("Пожалуйста, введите корректную сумму!");
      return;
    }

    const cashValue = Number(inputCash);
    alert(JSON.stringify(authUser));
    alert(">> " + baseApiUrl + " \n " + getTelegramId());
  };

  return (
    <CommonLayout showBackButton={true}>
      {" "}
      <div>
        <div className="welcome-text">Запросить выплату</div>
        <br />
        <div className="simple-text">Подтвердите данные для вывода</div>
        <OutlineInput
          value={inputCash}
          onChange={(e) => setInputCash(e.target.value)}
          onClear={handleClearCash}
          textColor="#FFFFFF"
          placeholder="Сумма к выводу (максимальный баланс)"
        />
        <OutlineInput
          value={inputEMAIL}
          readOnly={true}
          onChange={(e) => setInputEMAIL(e.target.value)}
          onClear={handleClearEMAIL}
          textColor="#FFFFFF"
          placeholder="Email"
        />
        <br />
        <FilledButton onClick={handle}>Запросить выплату</FilledButton>
      </div>
    </CommonLayout>
  );
};

export default PaymentRequestPage;
