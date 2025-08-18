import React, { ReactNode } from "react";
import BackButton from "../components/buttons/back/BackButton";
import head_logo from "../assets/head_logo.png";

interface CommonLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  showBackButton = true,
}) => {
  return (
    <div className="App">
      <img src={head_logo} alt="Логотип" className="head_logo" />
      <br />
      {showBackButton && <BackButton />}
      <div className="content">{children}</div>
    </div>
  );
};

export default CommonLayout;
