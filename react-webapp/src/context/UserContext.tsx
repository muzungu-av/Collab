import { encodeTelegramId } from "../utils/RequestEncoder";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthUser {
  telegram_id?: number;
  username: string | null;
  is_active: boolean;
  blocked_automatically: boolean;
  signed_id?: string;
  email?: string | null;
  phone?: string | null;
  user_type?: "admin" | "manager" | "partner";
  referral_link?: string | null;
  partner_referral_link?: string | null;
  created_at?: Date;
}

interface UserContextType {
  authUser: AuthUser | null;
  baseApiUrl: string | null;
  updateAuthUser: (partialUser: Partial<AuthUser>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  children: ReactNode;
  telegram_id?: number;
}> = ({ children, telegram_id }) => {
  const [authUser, setAuthUser] = React.useState<AuthUser | null>(() => ({
    telegram_id, // устанавливается из пропсов
    username: null,
    is_active: false,
    blocked_automatically: false,
  }));
  const [baseApiUrl, setBaseApiUrl] = React.useState<string>("");

  // Функция для обновления полей AuthUser (кроме telegram_id)
  const updateAuthUser = (partialUser: Partial<AuthUser>) => {
    setAuthUser((prev) => (prev ? { ...prev, ...partialUser } : null));
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      // Получаем текущий URL приложения
      const currentUrl = window.location.origin;
      setBaseApiUrl(currentUrl);
      // данные user-а получаем
      try {
        if (!window.Telegram?.WebApp) {
          throw new Error("Telegram WebApp API не доступен.");
        }
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();
        const userId = Number(tg.initDataUnsafe?.user.id);
        const signed = encodeTelegramId(userId);
        const userData = JSON.stringify({
          telegram_id: userId,
          signed_id: signed,
        });

        const currentUrl = window.location.origin;
        fetch(`${currentUrl}/api/whoami`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.user) {
              updateAuthUser(data.user);
            }
          })
          .catch((err) => {
            alert("Ошибка при получении данных пользователя");
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ authUser, baseApiUrl, updateAuthUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuthUser must be used within a UserProvider");
  }
  return context;
};
