import React from "react";
import CommonLayout from "../../../layouts/CommonLayout";
import { useNavigate } from "react-router-dom";
import OutlineButton from "../../../components/buttons/OutlineButton";
// import foto_btn from "../../../assets/foto_btn.png";

const ManagerPostOrder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout showBackButton={true}>
      <div>
        <div className="welcome-text">Разместить заказ</div>
        <br />
        <div style={{ color: "#fff", fontSize: "18px " }}>
          Сделайте фото/скриншот заказа
        </div>

        <br />
        <br />
        <div style={{ color: "#fff", fontSize: "14px" }}>
          На изображении должна быть чётко видна цена и описание заказа
        </div>

        <br />
        <br />
        <svg
          width="111"
          height="110"
          viewBox="0 0 111 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "25px" }}
          onClick={() => alert("SVG нажали!")}
        >
          <rect
            x="1"
            y="0.5"
            width="109"
            height="109"
            rx="4.5"
            fill="url(#paint0_linear_251_1811)"
            fill-opacity="0.1"
          />
          <rect
            x="1"
            y="0.5"
            width="109"
            height="109"
            rx="4.5"
            stroke="url(#paint1_linear_251_1811)"
          />
          <path
            d="M36.7499 73.7502C35.6041 73.7502 34.6235 73.3425 33.8083 72.5273C32.993 71.712 32.5846 70.7307 32.5833 69.5835V44.5835C32.5833 43.4377 32.9916 42.4571 33.8083 41.6418C34.6249 40.8266 35.6055 40.4182 36.7499 40.4168H43.3124L45.9166 37.6043C46.2985 37.1877 46.7589 36.8578 47.2978 36.6148C47.8367 36.3717 48.4006 36.2502 48.9895 36.2502H57.5833C58.1735 36.2502 58.6687 36.4502 59.0687 36.8502C59.4687 37.2502 59.668 37.7446 59.6666 38.3335C59.6652 38.9224 59.4652 39.4175 59.0666 39.8189C58.668 40.2203 58.1735 40.4196 57.5833 40.4168H48.9895L45.1874 44.5835H36.7499V69.5835H70.0833V52.9168C70.0833 52.3266 70.2832 51.8321 70.6833 51.4335C71.0833 51.0349 71.5777 50.8349 72.1666 50.8335C72.7555 50.8321 73.2506 51.0321 73.652 51.4335C74.0534 51.8349 74.2527 52.3293 74.2499 52.9168V69.5835C74.2499 70.7293 73.8423 71.7106 73.027 72.5273C72.2117 73.3439 71.2305 73.7516 70.0833 73.7502H36.7499ZM70.0833 40.4168H67.9999C67.4096 40.4168 66.9152 40.2168 66.5166 39.8168C66.118 39.4168 65.918 38.9224 65.9166 38.3335C65.9152 37.7446 66.1152 37.2502 66.5166 36.8502C66.918 36.4502 67.4124 36.2502 67.9999 36.2502H70.0833V34.1668C70.0833 33.5766 70.2832 33.0821 70.6833 32.6835C71.0833 32.2849 71.5777 32.0849 72.1666 32.0835C72.7555 32.0821 73.2506 32.2821 73.652 32.6835C74.0534 33.0849 74.2527 33.5793 74.2499 34.1668V36.2502H76.3333C76.9235 36.2502 77.4187 36.4502 77.8187 36.8502C78.2187 37.2502 78.418 37.7446 78.4166 38.3335C78.4152 38.9224 78.2152 39.4175 77.8166 39.8189C77.418 40.2203 76.9235 40.4196 76.3333 40.4168H74.2499V42.5002C74.2499 43.0904 74.0499 43.5856 73.6499 43.9856C73.2499 44.3856 72.7555 44.5849 72.1666 44.5835C71.5777 44.5821 71.0833 44.3821 70.6833 43.9835C70.2832 43.5849 70.0833 43.0904 70.0833 42.5002V40.4168ZM53.4166 66.4585C56.0208 66.4585 58.2346 65.5474 60.0583 63.7252C61.8819 61.9029 62.793 59.6891 62.7916 57.0835C62.7902 54.4779 61.8791 52.2648 60.0583 50.4439C58.2374 48.6231 56.0235 47.7113 53.4166 47.7085C50.8096 47.7057 48.5964 48.6175 46.777 50.4439C44.9576 52.2703 44.0458 54.4835 44.0416 57.0835C44.0374 59.6835 44.9492 61.8974 46.777 63.7252C48.6048 65.5529 50.818 66.4641 53.4166 66.4585ZM53.4166 62.2918C51.9583 62.2918 50.7256 61.7884 49.7187 60.7814C48.7117 59.7745 48.2083 58.5418 48.2083 57.0835C48.2083 55.6252 48.7117 54.3925 49.7187 53.3856C50.7256 52.3786 51.9583 51.8752 53.4166 51.8752C54.8749 51.8752 56.1076 52.3786 57.1145 53.3856C58.1214 54.3925 58.6249 55.6252 58.6249 57.0835C58.6249 58.5418 58.1214 59.7745 57.1145 60.7814C56.1076 61.7884 54.8749 62.2918 53.4166 62.2918Z"
            fill="url(#paint2_linear_251_1811)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_251_1811"
              x1="0.5"
              y1="55"
              x2="110.5"
              y2="55"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBA220" />
              <stop offset="1" stop-color="#FFD28F" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_251_1811"
              x1="0.5"
              y1="55"
              x2="110.5"
              y2="55"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBA220" />
              <stop offset="1" stop-color="#FFD28F" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_251_1811"
              x1="32.5833"
              y1="52.9168"
              x2="78.4166"
              y2="52.9168"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBA220" />
              <stop offset="1" stop-color="#FFD28F" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width="111"
          height="110"
          viewBox="0 0 111 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => alert("SVG нажали!")}
        >
          <rect
            x="1"
            y="0.5"
            width="109"
            height="109"
            rx="4.5"
            fill="url(#paint0_linear_251_1808)"
            fill-opacity="0.1"
          />
          <rect
            x="1"
            y="0.5"
            width="109"
            height="109"
            rx="4.5"
            stroke="url(#paint1_linear_251_1808)"
          />
          <path
            d="M40.9167 46.6668V65.4168C40.9167 72.5002 46.3334 77.9168 53.4167 77.9168C60.5001 77.9168 65.9167 72.5002 65.9167 65.4168V40.4168C65.9167 35.8335 62.1667 32.0835 57.5834 32.0835C53.0001 32.0835 49.2501 35.8335 49.2501 40.4168V65.4168C49.2501 67.9168 50.9167 69.5835 53.4167 69.5835C55.9167 69.5835 57.5834 67.9168 57.5834 65.4168V46.6668"
            stroke="url(#paint2_linear_251_1808)"
            stroke-width="4"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_251_1808"
              x1="0.5"
              y1="55"
              x2="110.5"
              y2="55"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBA220" />
              <stop offset="1" stop-color="#FFD28F" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_251_1808"
              x1="0.5"
              y1="55"
              x2="110.5"
              y2="55"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBA220" />
              <stop offset="1" stop-color="#FFD28F" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_251_1808"
              x1="40.9167"
              y1="55.0002"
              x2="65.9167"
              y2="55.0002"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBA220" />
              <stop offset="1" stop-color="#FFD28F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </CommonLayout>
  );
};

export default ManagerPostOrder;
