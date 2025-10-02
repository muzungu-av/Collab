import React from "react";
import { encodeTelegramId } from "../../utils/RequestEncoder";
import { ResponseDto } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/UserContext";
import CommonLayout from "../../layouts/CommonLayout";
import FilledButton from "../../components/buttons/FilledButton";

const ManagerPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { baseApiUrl, getTelegramId } = useAuthUser();
  const location = useLocation();
  const { cost } = location.state || {};
  const { currency } = location.state || {};

  const handler = async () => {
    const telegramId = getTelegramId();
    if (!telegramId || !cost) {
      alert("Некорректные данные для оплаты.");
      return;
    }
    const signed = encodeTelegramId(telegramId);
    const userData = JSON.stringify({
      telegram_id: telegramId,
      signed_id: signed,
      currency: "USDT",
      amount: cost,
    }); // tx_hash  пока не нужен
    try {
      const response = await fetch(`${baseApiUrl}/api/payments/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ResponseDto<{ paidAmount: number; status: string }> =
        await response.json();

      if (result.success) {
        alert(
          `Оплата на сумму ${result.data?.paidAmount} ${currency} успешно инициирована.\nСтатус: ${result.data?.status}`
        );
        navigate("/manager-payment-success");
      } else {
        alert(`Ошибка оплаты: ${result.message || "Неизвестная ошибка"}`);
        navigate("/manager-payment-err");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Произошла ошибка: ${error.message}`);
      } else {
        alert("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Оплатить доступ</div>
        <br />
        <div className="simple-text">Подтвердите оплату</div>
        <br />
        <span className="gradient-text">
          К оплате - {cost} {currency}
        </span>
        <br />
        <br />
        <div style={{ color: "#fff", fontSize: "9px !important" }}>
          Убедитесь, что на вашем кошельке достаточно средств
        </div>
        <br />
        <br />
        <FilledButton onClick={handler}>Оплатить</FilledButton>
      </div>
    </CommonLayout>
  );
};

export default ManagerPaymentPage;
