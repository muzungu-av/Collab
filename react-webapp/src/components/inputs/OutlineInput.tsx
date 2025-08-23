import React from "react";
import "./OutlineInput.css";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const OutlineInput: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-container">
      <div className="outline-input-wrapper">
        <input
          className="outline-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default OutlineInput;
