import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import FilledButton from "../../components/buttons/FilledButton";
import { useNavigate } from "react-router-dom";
import success_logo from "../../assets/success_logo.png";

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <CommonLayout>
      <div className="welcome-text">Выплата произведена</div>
      <br />
      <img src={success_logo} alt="Логотип" className="success_logo" />
      <br />
      <div style={{ marginTop: 10 }}> </div>
      <div className="simple-text">Благодарим за сотрудничества</div>
      <br />
      <FilledButton onClick={() => navigate("/")}>Готово</FilledButton>
    </CommonLayout>
  );
};

export default PaymentSuccessPage;
