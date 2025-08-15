import React from "react";
import "./CustomButton.css";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick }) => {
  return (
    <div className="custom-button" onClick={onClick}>
      <span className="gradient-small-text">{children}</span>
    </div>
  );
};

export default CustomButton;
