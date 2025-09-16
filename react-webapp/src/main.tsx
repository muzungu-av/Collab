import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App";
import { encodeTelegramId } from "./utils/RequestEncoder";
import { AuthUser } from "./context/UserContext";

interface CheckAccessResult {
  userData?: AuthUser;
  renderPath: string;
  errorMsg?: string;
}

// Функция для проверки доступа
const checkAccess = async (id: number | null): Promise<CheckAccessResult> => {
  if (!id) {
    console.warn("ID пользователя не определен!");
    return { renderPath: "/user-detected-error" };
  }

  try {
    const signed = encodeTelegramId(id);
    const userReqData = JSON.stringify({
      telegram_id: id,
      signed_id: signed,
    });

    const currentUrl = window.location.origin;
    const response = await fetch(`${currentUrl}/api/user/whoami`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userReqData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resp = await response.json();
    let userData: AuthUser | null = null;
    console.log(">>>>>>>>>  ");
    console.log(JSON.stringify(resp));
    console.log(">>>>>>>>>  ");
    if (
      resp.status &&
      resp.status != "not_found" &&
      resp.status != "error" &&
      resp.status != "blocked"
    ) {
      userData = {
        telegram_id: id,
        username: resp.user.username,
        is_active: resp.user.is_active,
        blocked_automatically: resp.user.blocked_automatically,
        email: resp.user.email,
        phone: resp.user.phone,
        user_type: resp.user.user_type,
        referral_link: resp.user.referral_link,
        partner_referral_link: resp.user.partner_referral_link,
        created_at: resp.user.created_at,
        wallet: resp.user.wallet,
        wallet_type: resp.user.wallet_type,
        wallet_is_active: resp.user.wallet_is_active,
        wallet_is_verified: resp.user.wallet_is_verified,
        wallet_blocked_at: resp.user.wallet_blocked_at,
        wallet_block_reason: resp.user.wallet_block_reason,
      };
    } else {
      //"admin" | "manager" | "partner"
      userData = {
        telegram_id: id,
        username: "",
        is_active: false,
        blocked_automatically: true,
        email: "",
        phone: "",
        user_type: "unknown",
        referral_link: "",
        partner_referral_link: "",
        wallet: "",
      };
    }
    // Обработка статусов ответа
    switch (resp.status) {
      case "partner":
        return { userData, renderPath: "/partner" };
      case "manager":
        return { userData, renderPath: "/manager" };
      case "signup-continue":
        return { userData, renderPath: "/signup-continue" };
      case "blocked":
        return { userData, renderPath: "/user-blocked" };
      case "not_found":
        return { renderPath: "/" };
      case "error":
        return {
          renderPath: "/error",
          errorMsg: resp.message || "Неизвестная ошибка",
        };
      default:
        return {
          renderPath: "/error",
          errorMsg: "Неизвестный статус ответа",
        };
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
  const userTgData = tg.initDataUnsafe?.user;
  let userId: number;

  // Проверка на наличие переменной окружения
  if (import.meta.env.VITE_FORCE_USER_ID === "true") {
    userId = Number(import.meta.env.VITE_TG_USER_ID);
  } else {
    userId = Number(userTgData?.id);
  }

  const { userData, renderPath, errorMsg } = await checkAccess(userId);
  const root = document.getElementById("root");
  if (!root) return;

  createRoot(root).render(
    <StrictMode>
      <AppWrapper
        renderPath={renderPath}
        errorMsg={errorMsg}
        telegram_id={userId}
        user={userData}
      />
    </StrictMode>
  );
}
renderApp();
