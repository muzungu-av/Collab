import React from "react";
import "./OutlineButton.css";

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const OutlineButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="button-container">
      <div className="outline-button" onClick={onClick}>
        <span className="gradient-small-text">{children}</span>
      </div>
    </div>
  );
};

export default OutlineButton;
