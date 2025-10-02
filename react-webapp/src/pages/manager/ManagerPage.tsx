import FilledButton from "../../components/buttons/FilledButton";
import CommonLayout from "../../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";

const ManagerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout showBackButton={false}>
      <div className="welcome-text">
        Добро пожаловать в
        <span className="gradient-text">Collaborify Task</span>
      </div>
      <br />
      <br />
      <div className="simple-text">Здесь будет логотип</div>
      <br />
      <br />
      <FilledButton>Меню</FilledButton>
    </CommonLayout>
  );
};

export default ManagerPage;
