//ЭТО ГЛАВНАЯ СТРАНИЦА ВХОДА
//но экспортируется AppWrapper ниже
//ключевой объект App роутиться на "/" в AppWrapper

import React, { useEffect, useState } from "react";
import "./App.css";
import head_logo from "./assets/head_logo.png";
import CustomButton from "./components/buttons/CustomButton";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import PartnerPage from "./pages/PartnerPage";

const App: React.FC = () => {
  const [baseApiUrl, setBaseApiUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем текущий URL приложения
    const currentUrl = window.location.origin;
    setBaseApiUrl(currentUrl);
    console.log("Current URL:", currentUrl);
  }, []);

  const [userInfo, setUserInfo] = useState<{
    id?: string;
    username?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string>(
    "Скрипт загружен. Проверяем Telegram API..."
  );

  useEffect(() => {
    try {
      if (!window.Telegram?.WebApp) {
        throw new Error(
          "Telegram WebApp API не доступен. Откройте приложение внутри Telegram."
        );
      }

      setInfo((prev) => prev + "\nTelegram API доступен.");
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.ready();

      setInfo((prev) => prev + "\nПриложение готово (tg.ready вызван).");

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setInfo(
          (prev) =>
            prev +
            `\nСырые данные пользователя: ID = ${user.id || null}, Username = ${
              user.username || "не указано"
            }`
        );
        setUserInfo(user);
      } else {
        setInfo(
          (prev) =>
            prev + "\nДанные пользователя: не доступны (user is undefined)."
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Ошибка: " + err.message);
      }
    }
  }, []);

  // const handleButtonClick = async () => {
  //   try {
  //     const response = await fetch(`${baseApiUrl}/api/profile`, {
  //       method: "POST",
  //       credentials: "include", // Если куки для аутентификации
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user: "abs" }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Ошибка при запросе профиля");
  //     }
  //     const data = await response.json();
  //     console.log("Профиль пользователя:", data);
  //   } catch (error) {
  //     console.error("Ошибка:", error);
  //   }
  // };

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
        <div className="button-container">
          <CustomButton>Я покупаю бота (менеджер)</CustomButton>
        </div>
        <div className="button-container">
          <CustomButton onClick={() => navigate("/partner")}>
            Я хочу стать партнёром
          </CustomButton>
        </div>
        <div className="button-container">
          <CustomButton>У меня уже есть аккаунт</CustomButton>
        </div>
      </div>

      <div style={{ color: "#765", fontSize: "10px" }}>{baseApiUrl}</div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/partner" element={<PartnerPage />} />
    </Routes>
  </Router>
);

export default AppWrapper;
