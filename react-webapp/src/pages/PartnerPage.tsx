import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/back/BackButton";
import head_logo from "../assets/head_logo.png";

const ManagerPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <img src={head_logo} alt="Логотип" className="head_logo" />
      <br />
      <br />
      <BackButton />
      <div className="content">
        <h1>Страница партнера</h1>
      </div>
    </div>
  );
};

export default ManagerPage;
