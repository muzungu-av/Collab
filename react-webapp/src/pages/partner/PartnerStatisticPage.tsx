import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import MultiLineTextFrame from "../../components/multi_line_text_frame/MultiLineTextFrame";

const PartnerStatisticPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout showBackButton={true}>
      <MultiLineTextFrame />
    </CommonLayout>
  );
};

export default PartnerStatisticPage;
