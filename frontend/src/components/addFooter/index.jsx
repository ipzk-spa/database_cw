import "./footer.css";
import { Link } from "react-router-dom";
import "../../style.css";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
function Footer() {
  return (
    <>
    
    <div className="footer">
      <ul>
        <Title className="title" level={2}>
          Інформація
        </Title>
        {[
          { to: "/", label: "Головна" },
          { to: "/catalog", label: "Каталог товарів" },
          { to: "/", label: "О нас" },
        ].map((item) => (
          <Link to={item.to} id="navLink">
            <li id="navElement" key={item.label}>
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
      <ul className="delivery">
        <Title className="title" level={2}>
          Доставка
        </Title>
        <div className="deliveryInfo">
          <div>
            <Paragraph>Доставка по Україні</Paragraph>
            <p>з 12:00 до 20:00</p>
          </div>
          <div>
            <Paragraph>Самовивіз</Paragraph>
            <p>з 8:00 до 20:00</p>
          </div>
        </div>
      </ul>
      <ul>
        <Title className="title" level={2}>
          Благодійність
        </Title>
        <div>
          <img src="/img/logo.png" alt="Logo" id="Logo" />
        </div>
      </ul>
    </div>
    <div className="policyBlock"><p className="policyText">- © Copyright Octafxt 2024</p></div>
    </>
  );
}

export default Footer;

