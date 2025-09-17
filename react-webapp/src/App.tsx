//ЭТО ГЛАВНАЯ СТРАНИЦА ВХОДА
//но экспортируется AppWrapper ниже
//ключевой объект App роутится на "/" в AppWrapper

import React from "react";
import "./App.css";
import head_logo from "./assets/head_logo.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import PartnerCodeCheckPage from "./pages/partner/PartnerCodeCheckPage";
import AdminContact from "./pages/AdminContact";
import OutlineButton from "./components/buttons/OutlineButton";
import { AuthUser, UserProvider } from "./context/UserContext";
import PartnerSignUpFinishPage from "./pages/partner/PartnerSignUpFinishPage";
import PartnerStartPage from "./pages/partner/PartnerStartPage";
import UserDetectedErrorPage from "./pages/UserDetectedErrorPage";
import BlockPage from "./pages/BlockPage";
import ErrorPage from "./pages/ErrorPage";
import ReferralLinkPage from "./pages/partner/ReferralLinkPage";
import PartnerSignUpPage from "./pages/partner/PartnerCodeCheckPage";
import PartnerPage from "./pages/partner/PartnerPage";
import PartnerStatisticPage from "./pages/partner/PartnerStatisticPage";
import PaymentRequestPage from "./pages/partner/PaymentRequestPage";
import PaymentConfirmationPage from "./pages/partner/PaymentConfirmationPage";
import PaymentSuccessPage from "./pages/partner/PaymentSuccessPage";
import ManagerSignUpPage from "./pages/manager/ManagerSignUpPage";
import ManagerPaymentOfferPage from "./pages/manager/ManagerPaymentOfferPage";

const App: React.FC = () => {
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
        <OutlineButton onClick={() => navigate("/manager-signup")}>
          Я покупаю бота (менеджер)
        </OutlineButton>
        <OutlineButton onClick={() => navigate("/partner-start")}>
          Я хочу стать партнёром
        </OutlineButton>
        <OutlineButton>Исполнитель</OutlineButton>
      </div>

      {/* <div style={{ color: "#765", fontSize: "10px" }}>{baseApiUrl}</div> */}
    </div>
  );
};

interface AppWrapperProps {
  user?: AuthUser;
  renderPath?: React.ReactNode;
  errorMsg?: string;
  telegram_id?: number;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  user,
  renderPath,
  errorMsg,
  telegram_id,
}) => {
  const isUserDetectedError = renderPath === "/user-detected-error";
  const isUserBlocked = renderPath === "/user-blocked";
  const isError = renderPath === "/error";
  const isPartner = renderPath === "/partner"; //авто-вход на страницу партнера
  const isManager = renderPath === "/manager"; //авто-вход на страницу менеджера
  const isPartnerSignupContinue = renderPath === "/signup-continue"; // незавершенная регистрация партнера
  //PartnerSignUpFinishPage

  // роутинг - условия всяких нестандартных случаев
  const renderErrorRoutes = () => (
    <>
      {isUserDetectedError && (
        <Route path="/" element={<UserDetectedErrorPage />} />
      )}
      {isUserBlocked && <Route path="/" element={<BlockPage />} />}
      {isError && <Route path="/" element={<ErrorPage message={errorMsg} />} />}
    </>
  );

  /* тут рендер для продолжения регистрации партнера (когда не завершил) */
  const renderPartnerSignupContinue = () => (
    <>
      {isPartnerSignupContinue && (
        <Route path="/" element={<PartnerSignUpPage />} />
      )}
    </>
  );

  /* тут рендер всех страниц manager-ов */
  const renderManagerRootRoutes = () => (
    <>
      {/* эта страница для авто-входа */}
      {isManager && <Route path="/" element={<ManagerPaymentOfferPage />} />}
    </>
  );

  /* тут рендер всех страниц партнеров */
  const renderParnerRootRoutes = () => (
    <>
      {/* эта страница для авто-входа */}
      {isPartner && <Route path="/" element={<PartnerPage />} />}
      {isPartner && <Route path="/ref-link" element={<ReferralLinkPage />} />}
      {isPartner && <Route path="/admin-contact" element={<AdminContact />} />}
      {isPartner && (
        <Route path="/partner-statistic" element={<PartnerStatisticPage />} />
      )}
      {isPartner && (
        <Route
          path="/partner-request-payment"
          element={<PaymentRequestPage />}
        />
      )}
      {isPartner && (
        <Route
          path="/partner-payment-confirmation"
          element={<PaymentConfirmationPage />}
        />
      )}
      {isPartner && (
        <Route
          path="/partner-payment-success"
          element={<PaymentSuccessPage />}
        />
      )}
    </>
  );

  /* тут рендер  страниц  для всех новых пользователей (безусловный роутинг) */
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
      <Route path="/user-detected-error" element={<UserDetectedErrorPage />} />
      <Route path="/manager-signup" element={<ManagerSignUpPage />} />
    </>
  );

  return (
    <UserProvider user={user} telegram_id={telegram_id}>
      <Router>
        <Routes>
          {renderErrorRoutes()}
          {renderParnerRootRoutes()}
          {renderManagerRootRoutes()}
          {renderPartnerSignupContinue()}
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
