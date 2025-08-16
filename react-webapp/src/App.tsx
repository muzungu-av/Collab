import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import CustomButton from "./components/buttons/CustomButton";

const App: React.FC = () => {
  const [baseApiUrl, setBaseApiUrl] = useState<string>("");

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

  return (
    <div className="App">
      <img src={logo} alt="Логотип" className="logo" />
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
          <CustomButton>Я хочу стать партнёром</CustomButton>
        </div>
        <div className="button-container">
          <CustomButton>У меня уже есть аккаунт</CustomButton>
        </div>
      </div>

      <div style={{ color: "#765", fontSize: "10px" }}>{baseApiUrl}</div>
    </div>
  );
};

export default App;
