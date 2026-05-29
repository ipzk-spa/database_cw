import "./home.css";
import { Carousel, Card, Divider, Collapse, Typography, List } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

function Home() {
  return (
    <div className="homePage">
      <div className="homeBlock">
        <Carousel
          autoplay={{ dotDuration: true }}
          autoplaySpeed={2000}
          arrows
          style={{ borderBottom: "1px solid #ccc" }}
        >
          <div>
            <img
              width={"100%"}
              src="/img/web-pack/ua_glenmo_1520x400_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              width={"100%"}
              src="/img/web-pack/ua_prosecco_1520x400_ua12.jpg"
              alt=""
            />
          </div>
        </Carousel>
        <div
          style={{ display: "flex", background: "white", paddingLeft: "20px" }}
        >
          <div style={{ flex: 1, paddingRight: "20px" }}>
            <h3>
              <EnvironmentOutlined /> Житомир, вул. Київська, 77, ТРЦ «Глобал
              UA»
            </h3>
            <p>
              <FileOutlined /> Клуб формату Premium&Business
            </p>
            <p>
              <ClockCircleOutlined /> Генератор
            </p>
            <p>
              <PhoneOutlined /> +38 (041) 255-92-22 (відділ продажів)
            </p>
            <p>
              <PhoneOutlined /> +38 (041) 255-80-03 (відділ сервісу)
            </p>
            <h4>Працює</h4>
            <p>Пн-Пт: 7:30-21:30</p>
            <p>Сб-Нд: 9:00-20:00</p>
          </div>

          <div style={{ flex: 1 }}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9902326006745!2d2.292292015674554!3d48.85837360804454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fddf1d22f3f%3A0x78d9aa2e22c9f90!2sEiffel+Tower!5e0!3m2!1sen!2sfr!4v1633029009978!5m2!1sen!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
        <Card
          title="Товари"
          bordered={false}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <div className="alcoholBlock">
            {[
              {
                img: "/img/web-pack/whiskey-with-bg.jpg",
                label: "Віскі",
                value: "Whiskey",
              },
              {
                img: "/img/web-pack/brandy-with-bg.jpg",
                label: "Бренді",
                value: "Brandy",
              },
              {
                img: "/img/web-pack/vodka-with-bg.jpg",
                label: "Горілка",
                value: "Vodka",
              },
              {
                img: "/img/web-pack/rum-with-bg.jpg",
                label: "Ром",
                value: "Rum" ,
              },
              {
                img: "/img/web-pack/tequila-with-bg.jpg",
                label: "Текіла",
                value: "Tequila",
              },
              {
                img: "/img/web-pack/wines-with-bg.jpg",
                label: "Вино",
                value: "Wines",
              },
              {
                img: "/img/web-pack/gin-with-bg.jpg",
                label: "Джин",
                value: "Gin",
              },
              {
                img: "/img/web-pack/liquor-with-bg.jpg",
                label: "Лікер",
                value: "Liquor",
              },
              {
                img: "/img/web-pack/beer-with-bg.jpg",
                label: "Пиво",
                value: "Beer",
              },
            ].map((item) => (
              <Link to={`/catalog?type=${item.value}`} key={item.label}>
                <div className="table-cell">
                  <img src={item.img} alt={item.label} className="blockImg" />
                  <p id="alcoholTitle">{item.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
        <Divider style={{ marginTop: "20px", borderColor: "rgb(205, 70, 49)" }}>
          Інформація
        </Divider>
        <div className="collapseText">
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            style={{ marginBottom: "20px", background: "white" }}
          >
            <Panel header="Про інтернет магазин ALCOHOL store" key="1">
              <Typography>
                <Title level={2}>Інтернет магазин алкоголю ALCOHOL store</Title>
                <Paragraph>
                  ALCOHOL store працює вже понад 10 років і забезпечує
                  український ринок найкращими видами алкогольних напоїв різного
                  сегменту. Наш алкоголь маркет злагоджено співпрацює з
                  постачальниками з різних країн світу, щоб дати можливість
                  купити алко та презентувати ALCOHOL store для широкої групи
                  споживачів.
                </Paragraph>
                <Paragraph>
                  Здобувши великий досвід у світі алкоголю, ми можемо впевнено
                  сказати, що найбільш якісні алкогольні напої в Україні можна
                  знайти саме у наших виномаркетах. Історія компанії розпочалася
                  з міста Київ, а зараз заполонила всю Україну.
                </Paragraph>
              </Typography>
            </Panel>
            <Panel header="Чому обирають ALCOHOL store?" key="2">
              <Typography>
                <Title level={3}>Основні переваги</Title>
                <List
                  size="small"
                  bordered
                  dataSource={[
                    "Широкий асортимент алкоголю",
                    "Висока якість продукції",
                    "Доступні ціни",
                    "Професійний сервіс",
                    "Зручна доставка по всій Україні",
                  ]}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Typography>
            </Panel>
            <Panel header="Асортимент продукції" key="3">
              <Typography>
                <Title level={3}>Що ми пропонуємо?</Title>
                <Paragraph>
                  У нашому асортименті ви знайдете: елегантні ігристі вина,
                  шампанське, лікери, коньяк, віскі, бренді, текілу, ром та інші
                  напої з кращих винних регіонів світу. Також ми пропонуємо
                  напої власного імпорту, які є унікальними на українському
                  ринку.
                </Paragraph>
              </Typography>
            </Panel>
            <Panel header="Як замовити?" key="4">
              <Typography>
                <Title level={3}>Замовлення та доставка</Title>
                <Paragraph>
                  Ви можете замовити алкоголь через наш сайт та вибрати зручний
                  спосіб доставки: через Нову Пошту, кур'єрську доставку чи
                  самовивіз з найближчого магазину.
                </Paragraph>
                <Paragraph>
                  Також є можливість доставки по всій Україні, а функція
                  самовивозу доступна в таких містах, як Київ, Харків, Одеса,
                  Львів та інші.
                </Paragraph>
              </Typography>
            </Panel>
          </Collapse>

          <Card
            title="Наші переваги"
            bordered={false}
            style={{ marginTop: "20px", fontSize: "20px" }}
          >
            <Typography>
              <Paragraph>
                Ми працюємо лише з перевіреними постачальниками та пропонуємо
                продукцію високої якості, яка пройшла суворий відбір. Ви можете
                бути впевнені в кожному покупці, адже ми гарантуємо
                відповідність товару сертифікатам якості.
              </Paragraph>
              <Paragraph>
                Також ми регулярно проводимо акції та знижки, щоб зробити
                покупку максимально вигідною для наших клієнтів.
              </Paragraph>
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

