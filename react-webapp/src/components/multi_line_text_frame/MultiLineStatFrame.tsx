import React from "react";
import "./MultiLineStatFrame.css";

interface StatItem {
  lines: string[];
  value: string;
}

interface MultiLineStatFrameProps {
  stats: StatItem[];
}

const MultiLineStatFrame: React.FC<MultiLineStatFrameProps> = ({ stats }) => {
  return (
    <div className="statistic-container">
      {stats.map(({ lines, value }, index) => (
        <React.Fragment key={index}>
          <div className="statistic-item">
            <span className="gradient-text-statistic-item">
              {lines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
            <span className="value-wrapper">
              <span className="value-text">{value}</span>
            </span>
          </div>
          {index < stats.length - 1 && <div className="statistic-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MultiLineStatFrame;
