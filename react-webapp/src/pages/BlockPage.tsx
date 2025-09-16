import React from "react";
import CommonLayout from "../layouts/CommonLayout";

const BlockPage: React.FC = () => {
  return (
    <CommonLayout showBackButton={false}>
      <div className="welcome-text">Вы заблокированны</div>
      <div className="simple-text">Для связи с администрацией</div>
      <div className="simple-text">напишите нам на почту:</div>
      <div style={{ marginTop: 10 }}> </div>
      <p style={{ color: "#519ABA" }}>
        <span style={{ userSelect: "text" }}>
          {import.meta.env.VITE_ADMIN_CONTACT_EMAIL}
        </span>
      </p>
    </CommonLayout>
  );
};

export default BlockPage;
//todo
/* после блокировки непрв ввода кода партнера 
Произошла ошибка
Cannot read properties of undefined (reading 'username')

Для связи с администрацией
напишите нам на почту:
*/
