// Расширяем глобальный интерфейс Window
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        expand: () => void;
        ready: () => void;
        initDataUnsafe: {
          user: {
            id: string;
            username?: string;
            // Добавьте другие поля
            first_name?: string;
            last_name?: string;
          };
        };
        // Добавьте другие методы и свойства
        sendData?: (data: string) => void;
        close?: () => void;
      };
    };
  }
}

// Пустая экспортируемая строка, чтобы файл считался модулем
export {};
