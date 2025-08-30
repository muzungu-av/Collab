import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import { encodeTelegramId } from "../utils/RequestEncoder";
import OutlineButton from "../components/buttons/OutlineButton";

const PartnerPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();

  // const handleClearFIO = () => {
  //   setInputFIO("");
  // };
  // const handleClearEMAIL = () => {
  //   setInputEMAIL("");
  // };
  // const handleClearWALLET = () => {
  //   setInputWALLET("");
  // };
  const handler = async () => {
    navigate("/");
  };

  return (
    <CommonLayout showBackButton={false}>
      <div>
        <div className="welcome-text">Личный кабинет</div>
        <br />
        <OutlineButton onClick={handler}>Моя реферальная ссылка</OutlineButton>
        <OutlineButton onClick={handler}>Запросиить выплату</OutlineButton>
        <OutlineButton onClick={handler}>Статистика</OutlineButton>
        <OutlineButton onClick={handler}>Поддержка</OutlineButton>
      </div>
    </CommonLayout>
  );
};

export default PartnerPage;
