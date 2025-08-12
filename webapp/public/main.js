// webapp/main.js

window.addEventListener("load", () => {
  const userInfoDiv = document.getElementById("user-info");
  const infoBox = document.getElementById("info");
  const errorBox = document.getElementById("error");

  // Отладка: Начало скрипта
  infoBox.innerText = "Скрипт загружен. Проверяем Telegram API...";

  try {
    if (!window.Telegram || !window.Telegram.WebApp) {
      throw new Error(
        "Telegram WebApp API не доступен. Откройте приложение внутри Telegram."
      );
    }

    // Отладка: API доступен
    infoBox.innerText += "\nTelegram API доступен.";

    const tg = window.Telegram.WebApp;
    tg.expand(); // Разворачиваем приложение на весь экран
    tg.ready(); // Уведомляем, что готовы

    // Отладка: После ready
    infoBox.innerText += "\nПриложение готово (tg.ready вызван).";

    const user = tg.initDataUnsafe.user; // Получаем данные пользователя

    // Отладка: Выводим сырые данные пользователя в info (для проверки)
    if (user) {
      infoBox.innerText +=
        "\nСырые данные пользователя: ID = " +
        (user.id || "не определено") +
        ", Username = " +
        (user.username || "не указано");
    } else {
      infoBox.innerText +=
        "\nДанные пользователя: не доступны (user is undefined).";
    }

    if (user) {
      // Выводим ID и имя на экран
      userInfoDiv.innerHTML = `
          <p><strong>Telegram ID:</strong> ${user.id}</p>
          <p><strong>Имя пользователя:</strong> ${
            user.username || "Не указано"
          }</p>
        `;
      infoBox.innerText += "\nДанные пользователя успешно получены и выведены.";
    } else {
      throw new Error("Данные пользователя не доступны.");
    }
  } catch (err) {
    errorBox.innerText = "Ошибка: " + err.message;
  }
});
