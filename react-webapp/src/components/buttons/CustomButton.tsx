import React from "react";
import "./CustomButton.css";

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children }) => {
  return (
    <div className="custom-button" onClick={onClick}>
      <span className="gradient-small-text">{children}</span>
    </div>
  );
};

export default CustomButton;
