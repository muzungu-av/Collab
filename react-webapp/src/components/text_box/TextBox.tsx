import React from "react";
import "./TextBox.css";

export interface TextBoxProps {
  children: React.ReactNode;
}

const TextBox: React.FC<TextBoxProps> = ({ children }) => {
  return <div className="result-text-message">{children}</div>;
};

export default TextBox;
