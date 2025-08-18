import React from "react";
import BackButton from "../components/buttons/back/BackButton";
import head_logo from "../assets/head_logo.png";
import OutlineButton from "../components/buttons/OutlineButton";
import FilledButton from "../components/buttons/FilledButton";

const ManagerPage: React.FC = () => {
  return (
    <div className="App">
      <img src={head_logo} alt="Логотип" className="head_logo" />
      <br />
      <br />
      <BackButton />
      <div className="content">
        <div className="welcome-text">Партнёрская программа</div>
        <br />
        <div className="simple-text">Чтобы зарегистрироваться как</div>
        <div className="simple-text">партнер, нужен специальный код.</div>
        <div style={{ marginTop: 10 }}> </div>
        <div className="simple-text">Если у вас его нет — обратитесь</div>
        <div className="simple-text">к администрации</div>
        <br />
        <OutlineButton>Ввести код</OutlineButton>
        <FilledButton>Связаться администрацией</FilledButton>
      </div>
    </div>
  );
};

export default ManagerPage;
