import React from "react";
import "./OutlineInput.css";
import closeIcon from "./close-icon.svg";

interface InputProps {
  value: string;
  textColor?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const OutlineInput: React.FC<InputProps> = ({
  value,
  textColor = "#ffffff",
  onChange,
  onClear,
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
          style={{ color: textColor }}
        />
        {value && (
          <button className="clear-icon" onClick={onClear}>
            <img src={closeIcon} alt="Clear" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OutlineInput;
