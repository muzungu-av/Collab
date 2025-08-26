//ЭТО ГЛАВНАЯ СТРАНИЦА ВХОДА
//но экспортируется AppWrapper ниже
//ключевой объект App роутится на "/" в AppWrapper

import React, { useEffect, useState } from "react";
import "./App.css";
import head_logo from "./assets/head_logo.png";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import PartnerPage from "./pages/PartnerStartPage";
import PartnerCodeCheckPage from "./pages/PartnerCodeCheckPage";
import AdminContact from "./pages/AdminContact";
import OutlineButton from "./components/buttons/OutlineButton";
import { UserProvider } from "./context/UserContext";
import PartnerSignUpFinishPage from "./pages/PartnerSignUpFinishPage";

const App: React.FC = () => {
  // const [baseApiUrl, setBaseApiUrl] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="App">
      <img src={head_logo} alt="Логотип" className="head_logo" />
      <div className="content">
        <div className="welcome-text">
          Добро пожаловать в
          <span className="gradient-text">Collaborify Task</span>
        </div>
        <br />
        <div className="simple-text">Выберите, как вы хотите</div>
        <div className="simple-text">использовать бота:</div>
        <OutlineButton>Я покупаю бота (менеджер)</OutlineButton>
        <OutlineButton onClick={() => navigate("/partner-start")}>
          Я хочу стать партнёром
        </OutlineButton>
        <OutlineButton>У меня уже есть аккаунт</OutlineButton>
      </div>

      {/* <div style={{ color: "#765", fontSize: "10px" }}>{baseApiUrl}</div> */}
    </div>
  );
};

const AppWrapper = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-contact" element={<AdminContact />} />
        <Route path="/partner-start" element={<PartnerPage />} />
        <Route path="/partner-codecheck" element={<PartnerCodeCheckPage />} />
        <Route
          path="/partner-signupfinish"
          element={<PartnerSignUpFinishPage />}
        />
      </Routes>
    </Router>
  </UserProvider>
);

export default AppWrapper;
