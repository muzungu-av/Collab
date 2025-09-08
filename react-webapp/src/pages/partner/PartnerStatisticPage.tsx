import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import MultiLineStatFrame from "../../components/multi_line_text_frame/MultiLineStatFrame";

const PartnerStatisticPage: React.FC = () => {
  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Статистика</div>
        <br />
        <MultiLineStatFrame
          stats={[
            { lines: ["Переходов по", "ссылке:"], value: "30" },
            { lines: ["Регистраций", "по ссылке:"], value: "30" },
            { lines: ["Всего", "регистраций:"], value: "30" },
            { lines: ["Выполненных", "работ:"], value: "30" },
            { lines: ["Сумма", "выполненных", "работ:"], value: "130$" },
            { lines: ["Выплачено:"], value: "930$" },
          ]}
        />
      </div>
    </CommonLayout>
  );
};

export default PartnerStatisticPage;
