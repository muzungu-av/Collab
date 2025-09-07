import React from "react";
import "./MultiLineTextFrame.css";

const MultiLineTextFrame: React.FC = () => {
  return (
    <>
      <div className="statistic-container">
        <div className="statistic-item">
          <span className="gradient-text">Переходов по ссылке:</span>
          <span className="value-wrapper">
            <span className="value-text">30</span>
          </span>
        </div>
        <div className="statistic-divider" />
        <div className="statistic-item">
          <span className="gradient-text">Регистраций по ссылке:</span>
          <span className="value-wrapper">
            <span className="value-text">30</span>
          </span>
        </div>
        <div className="statistic-divider" />
        <div className="statistic-item">
          <span className="gradient-text">Всего регистраций:</span>
          <span className="value-wrapper">
            <span className="value-text">30</span>
          </span>
        </div>
        <div className="statistic-divider" />
        <div className="statistic-item">
          <span className="gradient-text">Выполненных работ:</span>
          <span className="value-wrapper">
            <span className="value-text">30</span>
          </span>
        </div>
        <div className="statistic-divider" />
        <div className="statistic-item">
          <span className="gradient-text">Сумма выполненных работ:</span>
          <span className="value-wrapper">
            <span className="value-text">130$</span>
          </span>
        </div>
        <div className="statistic-divider" />
        <div className="statistic-item">
          <span className="gradient-text">Выплачено партнёру:</span>
          <span className="value-wrapper">
            <span className="value-text">930$</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default MultiLineTextFrame;
