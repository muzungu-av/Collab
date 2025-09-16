import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import OutlineInput from "../../components/inputs/OutlineInput";
import FilledButton from "../../components/buttons/FilledButton";

const ManagerPage: React.FC = () => {
  return (
    <CommonLayout showBackButton={false}>
      <div>
        <div className="welcome-text">менеджер</div>
      </div>
    </CommonLayout>
  );
};

export default ManagerPage;
