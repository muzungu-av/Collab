import React from "react";
import { useLocation } from "react-router-dom";
import CommonLayout from "../../layouts/CommonLayout";

const ManagerPaymentPageError: React.FC = () => {
  const location = useLocation();
  const { cost } = location.state || {};
  const { currency } = location.state || {};

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Ошибка</div>
        <br />
        <div className="simple-text">
          ❌{"\u00A0"}На{"\u00A0"}вашем{"\u00A0"}кошельке{"\u00A0"}недостаточно
          средств
        </div>
        <br />
        <br />
        <div style={{ color: "#fff", fontSize: "14px" }}>
          Пополните кошелёк, чтобы произвести оплату
        </div>
      </div>
    </CommonLayout>
  );
};

export default ManagerPaymentPageError;
