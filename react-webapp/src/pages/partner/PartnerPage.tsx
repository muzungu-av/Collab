import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/UserContext";
import { encodeTelegramId } from "../../utils/RequestEncoder";
import OutlineButton from "../../components/buttons/OutlineButton";

const PartnerPage: React.FC = () => {
  const navigate = useNavigate();
  const { authUser, baseApiUrl } = useAuthUser();

  // const handleClearEMAIL = () => {
  //   setInputEMAIL("");
  // };
  // const handleClearWALLET = () => {
  //   setInputWALLET("");
  // };
  const handleRefLink = () => {
    navigate("/ref-link");
  };
  const handleRequestPayment = () => {
    navigate("/partner-request-payment");
  };
  const handleStatistic = () => {
    navigate("/partner-statistic");
  };
  const handleSupport = () => {
    navigate("/admin-contact");
  };
  return (
    <CommonLayout showBackButton={false}>
      <div>
        <div className="welcome-text">Личный кабинет</div>
        <br />
        <OutlineButton onClick={handleRefLink}>
          Моя реферальная ссылка
        </OutlineButton>
        <OutlineButton onClick={handleRequestPayment}>
          Запросить выплату
        </OutlineButton>
        <OutlineButton onClick={handleStatistic}>Статистика</OutlineButton>
        <OutlineButton onClick={handleSupport}>Поддержка</OutlineButton>
      </div>
    </CommonLayout>
  );
};

export default PartnerPage;
