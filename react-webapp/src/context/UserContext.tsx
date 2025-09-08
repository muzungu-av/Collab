import { encodeTelegramId } from "../utils/RequestEncoder";
import React, { createContext, useContext, ReactNode } from "react";

export interface AuthUser {
  telegram_id?: number;
  username: string | null;
  is_active?: boolean;
  blocked_automatically?: boolean;
  signed_id?: string;
  email?: string | null;
  phone?: string | null;
  user_type?: "admin" | "manager" | "partner" | "unknown";
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
  user?: AuthUser;
  children: ReactNode;
  telegram_id?: number;
}> = ({ user, children, telegram_id }) => {
  const [authUser, setAuthUser] = React.useState<AuthUser | null>(() => ({
    telegram_id,
    username: user?.username ? user!.username : "",
    email: user?.email ? user!.email : "",
    phone: user?.phone ? user!.phone : "",
    user_type: user?.user_type ? user!.user_type : "unknown",
    referral_link: user?.referral_link ? user!.referral_link : "",
    partner_referral_link: user?.partner_referral_link
      ? user!.partner_referral_link
      : "",
    created_at: user?.created_at ? user!.created_at : undefined,
    is_active: user?.is_active ? user!.is_active : false,
    blocked_automatically: user?.blocked_automatically
      ? user!.blocked_automatically
      : false,
  }));
  const [baseApiUrl, setBaseApiUrl] = React.useState<string>("");

  // Функция для обновления полей AuthUser (кроме telegram_id)
  const updateAuthUser = (partialUser: Partial<AuthUser>) => {
    setAuthUser((prev) => (prev ? { ...prev, ...partialUser } : null));
  };

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
  const getTelegramId = (): number | undefined => {
    if (!context.authUser?.telegram_id) {
      return undefined;
    }
    // Если telegram_id уже число — возвращаем как есть
    if (typeof context.authUser.telegram_id === "number") {
      return context.authUser.telegram_id;
    }
    // Если telegram_id строка — преобразуем в число
    const parsedId = Number(context.authUser.telegram_id);
    return isNaN(parsedId) ? undefined : parsedId;
  };
  return {
    ...context,
    getTelegramId,
  };
};
