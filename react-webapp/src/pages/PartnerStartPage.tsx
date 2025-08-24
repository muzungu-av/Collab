import React from "react";
import CommonLayout from "../layouts/CommonLayout";
import OutlineButton from "../components/buttons/OutlineButton";
import FilledButton from "../components/buttons/FilledButton";
import { useNavigate } from "react-router-dom";

const PartnerStartPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <CommonLayout>
      <div className="welcome-text">Партнёрская программа</div>
      <br />
      <div className="simple-text">Чтобы зарегистрироваться как</div>
      <div className="simple-text">партнер, нужен специальный код.</div>
      <div style={{ marginTop: 10 }}> </div>
      <div className="simple-text">Если у вас его нет — обратитесь</div>
      <div className="simple-text">к администрации</div>
      <br />
      <OutlineButton onClick={() => navigate("/partner-codecheck")}>
        Ввести код
      </OutlineButton>
      <FilledButton onClick={() => navigate("/admin-contact")}>
        Связаться администрацией
      </FilledButton>
    </CommonLayout>
  );
};

export default PartnerStartPage;
