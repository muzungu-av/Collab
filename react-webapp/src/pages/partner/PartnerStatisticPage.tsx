import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import MultiLineStatFrame from "../../components/multi_line_text_frame/MultiLineStatFrame";

const PartnerStatisticPage: React.FC = () => {
  return (
    <CommonLayout showBackButton={true}>
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
    </CommonLayout>
  );
};

export default PartnerStatisticPage;
