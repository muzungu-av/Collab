import React, { useEffect, useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/UserContext";
import { encodeTelegramId } from "../utils/RequestEncoder";
import CopyIconButton from "../components/buttons/CopyIconButton";

const ReferralLinkPage: React.FC = () => {
  const navigate = useNavigate();
  const { authUser, baseApiUrl } = useAuthUser();
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Скопировано в буфер обмена!");
      })
      .catch((err) => {
        console.error("Не удалось скопировать текст: ", err);
      });
  };

  useEffect(() => {
    const fetchReferralLink = async () => {
      if (!authUser?.telegram_id) {
        setError("Telegram ID не найден");
        return;
      }

      setLoading(true);
      const signed = encodeTelegramId(authUser.telegram_id);
      const userData = JSON.stringify({
        telegram_id: authUser.telegram_id,
        signed_id: signed,
      });
      try {
        const response = await fetch(`${baseApiUrl}/api/user/ami`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        });

        if (!response.ok) {
          alert("Ошибка при получении данных");
        }

        const result = await response.json();
        console.log(JSON.stringify(result));
        if (result.user?.referral_link) {
          setReferralLink(result.user?.referral_link);
        } else {
          setError("Не удалось получить ссылку");
        }
      } catch (err) {
        setError("Неизвестная ошибка - " + JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    };

    fetchReferralLink();
  }, []);

  const handler = async () => {
    navigate("/");
  };

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Моя реферальная ссылка</div>
        <br />
        {loading && <div>Загрузка...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {referralLink && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                Реферальный код: <strong>{referralLink}</strong>
              </div>
              <CopyIconButton onClick={() => copyToClipboard(referralLink)} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                Полная ссылка:{" "}
                <a
                  href={`/api/regm/${referralLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${window.location.origin}/api/regm/${referralLink}`}
                </a>
              </div>
              <CopyIconButton
                onClick={() =>
                  copyToClipboard(
                    `${window.location.origin}/api/regm/${referralLink}`
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default ReferralLinkPage;
