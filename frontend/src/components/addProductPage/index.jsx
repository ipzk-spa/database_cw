import "../../style.css";
import { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Badge,
  InputNumber,
  Image,
  Tabs,
  Descriptions,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import {
  getProductImageUrl,
  addToCart,
  formatProductTitle,
  formatBrandName,
  getTypeAlcoholLabel,
  formatVolume,
  formatDurability,
} from "../../utils/helpers";

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

function Product() {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <div>Товар не найден.</div>;
  }

  const addCartProduct = () => {
    addToCart(item, quantity);
    message.success("Товар додано до кошика");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row justify="center" style={{ padding: 20, width: "70%" }}>
        <Col>
          <Image
            alt={item.type_alcohol || "Изображение товара"}
            src={getProductImageUrl(item)}
            width={500}
          />
        </Col>
        <Col xs={24} md={12} style={{ paddingLeft: 20 }}>
          <Title level={3}>{formatProductTitle(item)}</Title>
          {item.availability ? (
            <Text type="success">✅ Є в наявності</Text>
          ) : (
            <Text type="danger">❌ Немає в наявності</Text>
          )}
          <br />
          <Title level={2} style={{ marginTop: 10 }}>
            {item.cost * quantity} грн
          </Title>
          <Text delete>{quantity > 1 ? item.cost + " грн" : ""}</Text>

          <div style={{ marginTop: 10 }}>
            <Text type="secondary">від 2 шт: {item.cost * 2} грн</Text> <br />
            <Text type="secondary">від 3 шт: {item.cost * 3} грн</Text>
          </div>

          <div style={{ marginTop: 20 }}>
            <InputNumber
              name="count"
              min={1}
              max={100}
              defaultValue={1}
              onChange={(value) => {
                if (value !== null) {
                  setQuantity(value);
                }
              }}
            />
            <Button
              type="primary"
              danger
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ marginLeft: 10 }}
              onClick={addCartProduct}
            >
              Додати в корзину
            </Button>
          </div>

          <Badge
            status="warning" // Ensure this value is valid for the Badge component
            text="Дизайн пляшки та етикетки може відрізнятися від фактичного."
            style={{ marginTop: 20, display: "block" }}
          />

          <div style={{ marginTop: 30 }}>
            <Text type="secondary">Самовивіз: Безкоштовно</Text> <br />
            <Text type="secondary">Доставка Meest Пошта: За тарифами</Text>{" "}
            <br />
            <Text type="secondary">Безкоштовно від 2000 грн*</Text>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ padding: "20px 50px", width: "100%" }}>
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Характеристики" key="1">
                <Descriptions
                  bordered
                  column={1}
                  style={{ marginTop: 20, width: "100%" }}
                  labelStyle={{ width: 350 }}
                >
                  <Descriptions.Item label="Тип алкоголя">
                    {getTypeAlcoholLabel(item.type_alcohol)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Бренд">
                    {item.brand}
                  </Descriptions.Item>
                  <Descriptions.Item label="Країна виробництва">
                    {item.countries}
                  </Descriptions.Item>
                  <Descriptions.Item label="Об'єм">
                    {formatVolume(item.volume)} л
                  </Descriptions.Item>
                  <Descriptions.Item label="Міцність">
                    {formatDurability(item.durability)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ціна">
                    {item.cost} грн
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>
              <TabPane tab="Опис" key="2">
                <Title level={3}>
                  {formatBrandName(item.brand)} – {getTypeAlcoholLabel(item.type_alcohol)}
                </Title>
                <Paragraph style={{ fontSize: 30 }}>
                  {item.description || "Опис товару не доданий"}
                </Paragraph>
              </TabPane>
              <TabPane tab="Точки видачі" key="3">
                <div style={{ width: "100%", height: "600px" }}>
                  <iframe
                    title="Київ на карті"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.540543690655!2d30.522093915731447!3d50.450100079475065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce52b8c9a8ff%3A0xd9dbf8790b828c13!2z0JzQsNC70LDRgdGC0YwsINCa0LjQtdCy0YHRjNC60LAg0L7QsdC7Liwg0KPQutGA0LDQuNC90LAsIDAxMDAw!5e0!3m2!1suk!2sua!4v1712221123456!5m2!1suk!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Product;

