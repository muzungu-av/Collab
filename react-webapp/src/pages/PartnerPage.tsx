import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import { encodeTelegramId } from "../utils/RequestEncoder";
import OutlineButton from "../components/buttons/OutlineButton";

const PartnerPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();

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
    navigate("/partner-support");
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
          Запросиить выплату
        </OutlineButton>
        <OutlineButton onClick={handleStatistic}>Статистика</OutlineButton>
        <OutlineButton onClick={handleSupport}>Поддержка</OutlineButton>
      </div>
    </CommonLayout>
  );
};

export default PartnerPage;
