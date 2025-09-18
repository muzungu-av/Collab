import React from "react";
import { encodeTelegramId } from "../../utils/RequestEncoder";
import { ResponseDto } from "../../types";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "../../context/UserContext";
import CommonLayout from "../../layouts/CommonLayout";
import FilledButton from "../../components/buttons/FilledButton";

const ManagerPaymentPage: React.FC = () => {
  const { baseApiUrl, getTelegramId } = useAuthUser();
  const location = useLocation();
  const { cost } = location.state || {};
  const { currency } = location.state || {};
  const handler = async () => {
    let telegramId = getTelegramId();
    // Проверяем наличие всех необходимых данных перед отправкой
    if (!telegramId) {
      alert("Некорректные данные пользователя.");
      return;
    }
    alert("Пуньк");
    // try {
    //   const signed = encodeTelegramId(telegramId!);
    //   const userData = JSON.stringify({
    //     telegram_id: telegramId,
    //     signed_id: signed,
    //   });

    //   const response = await fetch(`${baseApiUrl}/api/manager/signup`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: userData,
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   // Получаем ответ от сервера в формате ResponseDto
    //   const result: ResponseDto<{ token?: string }> = await response.json();

    //   // Проверяем результат
    //   if (result.success) {
    //     // Успешная регистрация
    //     alert("Регистрация прошла успешно!");
    //     // Если есть токен, сохраняем его
    //     if (result.token) {
    //       localStorage.setItem("authToken", result.token);
    //     }
    //     // Перенаправляем на главную страницу
    //     window.location.href = "/";
    //   } else {
    //     // Ошибка регистрации
    //     alert(`Ошибка: ${result.message || "Неизвестная ошибка"}`);
    //     window.location.href = "/";
    //   }
    // } catch (error: unknown) {
    //   // Проверяем, является ли ошибка экземпляром Error
    //   if (error instanceof Error) {
    //     alert(`Произошла ошибка: ${error.message}`);
    //   } else {
    //     alert("Произошла неизвестная ошибка");
    //   }
    //   window.location.href = "/";
    // }
  };

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Оплатить доступ</div>
        <br />
        <div className="simple-text">Подтвердите оплату</div>
        <br />
        <span className="gradient-text">
          К оплате - {cost} {currency}
        </span>
        <br />
        <br />
        <div style={{ color: "#fff", fontSize: "9px !important" }}>
          Убедитесь, что на вашем кошельке достаточно средств
        </div>
        <br />
        <br />
        <FilledButton onClick={handler}>Оплатить</FilledButton>
      </div>
    </CommonLayout>
  );
};

export default ManagerPaymentPage;
