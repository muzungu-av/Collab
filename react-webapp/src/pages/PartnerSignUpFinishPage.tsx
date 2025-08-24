import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import OutlineButton from "../components/buttons/OutlineButton";
import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";
import OutlineInput from "../components/inputs/OutlineInput";

const PartnerSignUpFinishPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, baseApiUrl } = getUser();
  const [inputValue, setInputValue] = useState<string>("");
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);

  return (
    <CommonLayout>
      <div>
        <div className="welcome-text">Регистрация партнёра</div>
      </div>
    </CommonLayout>
  );
};

export default PartnerSignUpFinishPage;
