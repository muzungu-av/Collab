import React, { useEffect, useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import ReadOnlyValueBox from "../../components/box/ReadOnlyValueBox";
import FilledButton from "../../components/buttons/FilledButton";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/UserContext";
import { encodeTelegramId } from "../../utils/RequestEncoder";
import { ResponseDto } from "@/types";

const ManagerPaymentOfferPage: React.FC = () => {
  const navigate = useNavigate();
  const { authUser, baseApiUrl, getTelegramId } = useAuthUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cost, setCost] = useState<number>(1000000);
  const [currency, setCurrency] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoadCost = async () => {
      const telegramId = getTelegramId();
      if (!telegramId) {
        setError("Telegram ID не найден");
        return;
      }

      setLoading(true);
      const signed = encodeTelegramId(telegramId);
      const userData = JSON.stringify({
        telegram_id: telegramId,
        signed_id: signed,
      });
      try {
        const response = await fetch(
          `${baseApiUrl}/api/const/subscription-price`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: userData,
          }
        );

        if (!response.ok) {
          alert("Ошибка при получении данных");
        }

        const result: ResponseDto = await response.json();

        if (result.success && result.data.amount && result.data.currency) {
          setCost(result.data.amount);
          setCurrency(result.data.currency);
        } else {
          setError("Не удалось получить стоимость");
        }
      } catch (err) {
        setError("Неизвестная ошибка - " + JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    };

    fetchLoadCost();
  }, []);

  return (
    <CommonLayout showBackButton={false}>
      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && (
        <div>
          <div className="welcome-text">Оплатить доступ</div>
          <br />
          <div className="simple-text">Чтобы зарегистрироваться как</div>
          <div className="simple-text">менеджер, оплатите доступ</div>
          <br />
          <ReadOnlyValueBox
            label="Сумма оплаты:"
            value={cost + " " + currency!}
          />
          <br />
          <div style={{ color: "#fff", fontSize: "9px !important" }}>
            Оплата будет списана с привязанного кошелька
          </div>
          <br />
          <FilledButton
            onClick={() =>
              navigate("/manager-payment", {
                state: { cost: cost, currency: currency },
              })
            }
          >
            Дальше
          </FilledButton>
        </div>
      )}
    </CommonLayout>
  );
};

export default ManagerPaymentOfferPage;
