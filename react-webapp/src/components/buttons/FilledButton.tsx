import React from "react";
import "./FilledButton.css";
import { ButtonProps } from "./OutlineButton";

const FilledButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="button-container">
      <div className="outline-button-filled" onClick={onClick}>
        <span className="gradient-filled-small-text">{children}</span>
      </div>
    </div>
  );
};

export default FilledButton;
