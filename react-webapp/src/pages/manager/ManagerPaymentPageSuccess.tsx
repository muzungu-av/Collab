import React from "react";
import success_logo from "../../assets/success_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/UserContext";
import CommonLayout from "../../layouts/CommonLayout";
import FilledButton from "../../components/buttons/FilledButton";

const ManagerPaymentPageSuccess: React.FC = () => {
  const { baseApiUrl, getTelegramId } = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { cost } = location.state || {};
  const { currency } = location.state || {};

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Оплата произведена</div>
        <br />
        <img src={success_logo} alt="Логотип" className="success_logo" />
        <br />
        <div className="simple-text">Благодарим за сотрудничество</div>
        <br />
        <br />
        <FilledButton onClick={() => (window.location.href = "/")}>
          Готово
        </FilledButton>
      </div>
    </CommonLayout>
  );
};

export default ManagerPaymentPageSuccess;
