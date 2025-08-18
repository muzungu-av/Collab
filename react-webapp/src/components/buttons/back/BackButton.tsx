import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="back-button" onClick={() => navigate(-1)}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.9375 8.4375H15.1875C15.3367 8.4375 15.4798 8.49676 15.5852 8.60225C15.6907 8.70774 15.75 8.85082 15.75 9C15.75 9.14918 15.6907 9.29226 15.5852 9.39775C15.4798 9.50324 15.3367 9.5625 15.1875 9.5625H3.9375C3.78832 9.5625 3.64524 9.50324 3.53975 9.39775C3.43426 9.29226 3.375 9.14918 3.375 9C3.375 8.85082 3.43426 8.70774 3.53975 8.60225C3.64524 8.49676 3.78832 8.4375 3.9375 8.4375Z"
          fill="url(#paint0_linear_31_388)"
        />
        <path
          d="M4.17037 8.99998L8.83575 13.6642C8.94137 13.7698 9.00071 13.9131 9.00071 14.0625C9.00071 14.2119 8.94137 14.3551 8.83575 14.4607C8.73013 14.5663 8.58687 14.6257 8.4375 14.6257C8.28813 14.6257 8.14487 14.5663 8.03925 14.4607L2.97675 9.39823C2.92436 9.34598 2.8828 9.2839 2.85445 9.21557C2.82609 9.14723 2.81149 9.07397 2.81149 8.99998C2.81149 8.92599 2.82609 8.85273 2.85445 8.78439C2.8828 8.71605 2.92436 8.65398 2.97675 8.60173L8.03925 3.53923C8.14487 3.43361 8.28813 3.37427 8.4375 3.37427C8.58687 3.37427 8.73013 3.43361 8.83575 3.53923C8.94137 3.64485 9.00071 3.78811 9.00071 3.93748C9.00071 4.08685 8.94137 4.23011 8.83575 4.33573L4.17037 8.99998Z"
          fill="url(#paint1_linear_31_388)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_31_388"
            x1="3.375"
            y1="9"
            x2="15.75"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FBA220" />
            <stop offset="1" stop-color="#FFD28F" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_31_388"
            x1="2.81149"
            y1="8.99998"
            x2="9.00071"
            y2="8.99998"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FBA220" />
            <stop offset="1" stop-color="#FFD28F" />
          </linearGradient>
        </defs>
      </svg>
      <span className="back-button__text">Назад</span>
    </div>
  );
};

export default BackButton;
