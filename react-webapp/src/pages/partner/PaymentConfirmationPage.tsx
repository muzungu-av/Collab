import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import OutlineButton from "../../components/buttons/OutlineButton";
import FilledButton from "../../components/buttons/FilledButton";
import { useNavigate } from "react-router-dom";

const PaymentConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <CommonLayout>
      <div className="welcome-text">Вы запросили выплату</div>
      <br />
      <div className="simple-text">Вам доступно вывод в размере 170$</div>
      <div style={{ marginTop: 10 }}> </div>
      <div className="simple-text">Выплата будет отправлена </div>
      <div className="simple-text">на указанный вами адрес в USDT</div>

      <br />
      <OutlineButton onClick={() => navigate("/partner-request-payment")}>
        Отменить
      </OutlineButton>
      <FilledButton onClick={() => navigate("/partner-payment-success")}>
        Подтвердить
      </FilledButton>
    </CommonLayout>
  );
};

export default PaymentConfirmationPage;
