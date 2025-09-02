import React from "react";
import { FiCopy } from "react-icons/fi";

interface IconButtonProps {
  onClick: () => void;
}

const CopyIconButton: React.FC<IconButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="copy-icon-button">
      <FiCopy className="copy-icon" />
    </button>
  );
};

export default CopyIconButton;
