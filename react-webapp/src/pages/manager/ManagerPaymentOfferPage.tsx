import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import ReadOnlyValueBox from "../../components/box/ReadOnlyValueBox";
import FilledButton from "../../components/buttons/FilledButton";
import { useAuthUser } from "../../context/UserContext";

const ManagerPaymentOfferPage: React.FC = () => {
  const { baseApiUrl, getTelegramId } = useAuthUser();

  const handler = async () => {
    let telegramId = getTelegramId();
    // Проверяем наличие всех необходимых данных перед отправкой
    if (!telegramId) {
      alert("Некорректные данные пользователя.");
      return;
    } else {
      alert("пуньк");
    }
  };

  return (
    <CommonLayout showBackButton={false}>
      <div>
        <div className="welcome-text">Оплатить доступ</div>
        <br />
        <div className="simple-text">Чтобы зарегистрироваться как</div>
        <div className="simple-text">менеджер, оплатите доступ</div>
        <br />
        <ReadOnlyValueBox label="Сумма оплаты:" value="49€" />
        <br />
        <div style={{ color: "#fff", fontSize: "9px !important" }}>
          Оплата будет списана с привязанного кошелька
        </div>
        <br />
        <FilledButton onClick={handler}>Оплатить</FilledButton>
      </div>
    </CommonLayout>
  );
};

export default ManagerPaymentOfferPage;
