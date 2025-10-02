import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import OutlineButton from "../../components/buttons/OutlineButton";

const ManagerStartMenu: React.FC = () => {
  const navigate = useNavigate();

  const handlePostOrder = () => {
    navigate("/manager-post-order");
  };

  const handleInProgress = () => {
    navigate("/manager-in-progress");
  };
  const handleHistoryOrders = () => {
    navigate("/manager-history-order");
  };

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Разместить заказ</div>
        <br />
        <OutlineButton onClick={handlePostOrder}>
          Разместить заказ
        </OutlineButton>
        <OutlineButton onClick={handleInProgress}>В работе</OutlineButton>
        <OutlineButton onClick={handleHistoryOrders}>
          История заказов
        </OutlineButton>
      </div>
    </CommonLayout>
  );
};

export default ManagerStartMenu;
