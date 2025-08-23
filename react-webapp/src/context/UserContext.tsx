import React, { createContext, useContext, ReactNode } from "react";

interface User {
  id?: string;
  username?: string;
}

interface UserContextType {
  user: User | null;
  baseApiUrl: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [baseApiUrl, setBaseApiUrl] = React.useState<string>("");

  React.useEffect(() => {
    // Получаем текущий URL приложения
    const currentUrl = window.location.origin;
    setBaseApiUrl(currentUrl);
    // данные user-f получаем
    try {
      if (!window.Telegram?.WebApp) {
        throw new Error("Telegram WebApp API не доступен.");
      }
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.ready();
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser(userData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, baseApiUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export const getUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
