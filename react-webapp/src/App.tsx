//ЭТО ГЛАВНАЯ СТРАНИЦА ВХОДА
//но экспортируется AppWrapper ниже
//ключевой объект App роутится на "/" в AppWrapper

import React, { useEffect, useState } from "react";
import "./App.css";
import head_logo from "./assets/head_logo.png";
import { getUser } from "./context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import PartnerPage from "./pages/PartnerPage";
import PartnerCodeCheckPage from "./pages/PartnerCodeCheckPage";
import AdminContact from "./pages/AdminContact";
import OutlineButton from "./components/buttons/OutlineButton";
import { UserProvider } from "./context/UserContext";
import PartnerSignUpFinishPage from "./pages/PartnerSignUpFinishPage";
import PartnerStartPage from "./pages/PartnerStartPage";
import UserDetectedErrorPage from "./pages/UserDetectedErrorPage";
import BlockPage from "./pages/BlockPage";
import ErrorPage from "./pages/ErrorPage";
import ReferralLinkPage from "./pages/ReferralLinkPage";

const App: React.FC = () => {
  const [baseApiUrl, setBaseApiUrl] = useState<string>("");
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

interface AppWrapperProps {
  renderPath?: React.ReactNode;
  errorMsg?: string;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ renderPath, errorMsg }) => {
  const isUserDetectedError = renderPath === "/user-detected-error";
  const isUserBlocked = renderPath === "/user-blocked";
  const isError = renderPath === "/error";
  const isPartner = renderPath === "/partner"; //авто-вход на страницу партнера

  // условный роутинг - проверка на условия всяких нестандартных случаев
  const renderErrorRoutes = () => (
    <>
      {isUserDetectedError && (
        <Route path="/" element={<UserDetectedErrorPage />} />
      )}
      {isUserBlocked && <Route path="/" element={<BlockPage />} />}
      {isError && <Route path="/" element={<ErrorPage message={errorMsg} />} />}
    </>
  );

  //авто-вход на страницу партнера
  const renderParnerRootRoutes = () => (
    <>
      {isPartner && <Route path="/" element={<PartnerPage />} />}
      {isPartner && <Route path="/ref-link" element={<ReferralLinkPage />} />}
    </>
  );

  //авто-вход на главную страницу тут (дефолтный случай)
  // безусловный роутинг
  const renderDefaultRoutes = () => (
    <>
      <Route path="/" element={<App />} />
      <Route path="/admin-contact" element={<AdminContact />} />
      <Route path="/partner-start" element={<PartnerStartPage />} />
      <Route path="/partner-codecheck" element={<PartnerCodeCheckPage />} />
      <Route
        path="/partner-signupfinish"
        element={<PartnerSignUpFinishPage />}
      />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/user-detected-error" element={<UserDetectedErrorPage />} />
    </>
  );
  return (
    <UserProvider>
      <Router>
        <Routes>
          {renderErrorRoutes()}
          {renderParnerRootRoutes()}
          {!isUserDetectedError &&
            !isUserBlocked &&
            !isError &&
            !isPartner &&
            renderDefaultRoutes()}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default AppWrapper;
