import React from "react";
import CommonLayout from "../layouts/CommonLayout";

const UserDetectedErrorPage: React.FC = () => {
  return (
    <CommonLayout showBackButton={false}>
      <div className="simple-text">Не удалось определить ваш Telegram ID</div>
      <div className="simple-text">Войдите на страницу через бота,</div>
      <div className="simple-text">или перезагрузите её</div>
    </CommonLayout>
  );
};

export default UserDetectedErrorPage;
