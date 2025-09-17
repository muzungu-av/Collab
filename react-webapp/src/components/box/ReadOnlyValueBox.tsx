import React from "react";
import "./ReadOnlyValueBox.css";

export interface ReadOnlyValueBoxProps {
  label: string;
  value: string;
}

const ReadOnlyValueBox: React.FC<ReadOnlyValueBoxProps> = ({
  label,
  value,
}) => {
  return (
    <div className="read-only-value-container">
      <div className="read-only-value">
        <span className="read-only-value-gradient-text">{label}</span>
        <span className="read-only-value-gradient-text">{value}</span>
      </div>
    </div>
  );
};

export default ReadOnlyValueBox;
