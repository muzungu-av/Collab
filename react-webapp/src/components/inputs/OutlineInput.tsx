import React from "react";
import "./OutlineInput.css";
import closeIcon from "./close-icon.svg";

interface InputProps {
  value: string;
  readOnly?: boolean;
  textColor?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const OutlineInput: React.FC<InputProps> = ({
  value,
  readOnly = false,
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
          readOnly={readOnly}
          onChange={onChange}
          placeholder={placeholder}
          style={{ color: textColor }}
        />
        {value && !readOnly && (
          <button className="clear-icon" onClick={onClear}>
            <img src={closeIcon} alt="Clear" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OutlineInput;
