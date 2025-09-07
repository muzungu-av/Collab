import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App";
import { encodeTelegramId } from "./utils/RequestEncoder";

interface CheckPartnerAccessResult {
  renderPath: string;
  errorMsg?: string;
}

// Функция для проверки доступа
const checkPartnerAccess = async (
  id: number | undefined
): Promise<CheckPartnerAccessResult> => {
  if (!id) {
    console.warn("ID пользователя не определен!");
    return { renderPath: "/user-detected-error" };
  }

  try {
    const signed = encodeTelegramId(id);
    const userData = JSON.stringify({
      telegram_id: id,
      signed_id: signed,
    });

    const currentUrl = window.location.origin;
    const response = await fetch(`${currentUrl}/api/user/whoami`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resp = await response.json();
    // Обработка статусов ответа
    switch (resp.status) {
      case "found":
        return { renderPath: "/partner" };
      case "signup-continue":
        return { renderPath: "/signup-continue" };
      case "blocked":
        return { renderPath: "/user-blocked" };
      case "not_found":
        return { renderPath: "/" };
      case "error":
        return {
          renderPath: "/error",
          errorMsg: resp.message || "Неизвестная ошибка",
        };
      default:
        return { renderPath: "/error", errorMsg: "Неизвестный статус ответа" };
    }
  } catch (error) {
    console.error("Ошибка при проверке доступа:", error);
    return {
      renderPath: "/error",
      errorMsg: error instanceof Error ? error.message : "Неизвестная ошибка",
    };
  }
};

// Асинхронная функция для рендеринга
async function renderApp() {
  const tg = window.Telegram.WebApp;
  const userData = tg.initDataUnsafe?.user;
  const userId = Number(userData?.id);
  const { renderPath, errorMsg } = await checkPartnerAccess(userId);
  const root = document.getElementById("root");
  if (!root) return;

  createRoot(root).render(
    <StrictMode>
      <AppWrapper
        renderPath={renderPath}
        errorMsg={errorMsg}
        telegram_id={userId}
      />
    </StrictMode>
  );
}
renderApp();
