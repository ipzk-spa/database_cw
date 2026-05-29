import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../style.css";
import { Avatar, Input, Modal, Button, Empty, message } from "antd";
import axios from "axios";
import AuthModal from "../addAuthPage";
import {
  getAuthToken,
  getAuthHeaders,
  getProductImageUrl,
  formatOrderDate,
  formatProductTitle,
} from "../../utils/helpers";

const { Search } = Input;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const userCookie = getAuthToken();
  const [product, setProduct] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const syncCart = () => {
      const stored = localStorage.getItem("cart");
      setProduct(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  const calculateTotalCost = (products) =>
    products.reduce(
      (total, p) => total + parseFloat(p.cost) * (p.quantity || 1),
      0
    );

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleRemoveProduct = (id) => {
    const updatedProduct = product.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedProduct));
    setProduct(updatedProduct);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleSubmit = async () => {
    if (!userCookie) {
      setVisible(true);
      return;
    }
    if (product.length === 0) {
      message.warning("Кошик порожній");
      return;
    }

    setCheckoutLoading(true);
    try {
      const headers = getAuthHeaders();
      const me = await axios.get("/auth/me", { headers });
      const userId = me.data.userId;
      const total = calculateTotalCost(product);

      const orderRes = await axios.post(
        "/orders",
        { user_id: userId, total_price: total },
        { headers }
      );
      const orderId = orderRes.data.id;

      for (const item of product) {
        await axios.post(
          "/order-items",
          {
            alcohol_id: item.id,
            order_id: orderId,
            quantity: item.quantity || 1,
            price: Number(item.cost),
          },
          { headers }
        );
      }

      const label = formatOrderDate(new Date());
      const stored = localStorage.getItem("order");
      const ordered = stored ? JSON.parse(stored) : {};
      ordered[label] = product;
      localStorage.setItem("order", JSON.stringify(ordered));
      localStorage.setItem("cart", JSON.stringify([]));
      setProduct([]);
      window.dispatchEvent(new Event("cart-updated"));
      message.success("Замовлення оформлено!");
      setIsModalOpen(false);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Не вдалося оформити замовлення"
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const onSearch = (value) => {
    const q = value?.trim();
    if (!q) return;
    navigate(`/catalog?brand=${encodeURIComponent(q)}`);
  };

  return (
    <div>
      <nav className="header">
        <ul id="navBar">
          <img
            src="/img/logo.png"
            alt="Logo"
            id="Logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <div
              style={{
                borderRight: "1px solid #ccc",
                paddingRight: "20px",
                cursor: "pointer",
              }}
            >
              <Avatar
                size={86}
                icon={<UserOutlined style={{ color: "black" }} />}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  if (!userCookie) {
                    setVisible(true);
                  } else {
                    navigate("/profile");
                  }
                }}
              />
            </div>
            <div style={{ fontSize: "50px" }}>
              <ShoppingCartOutlined onClick={showModal} />
            </div>
          </div>
        </ul>
        <ul id="secondNavBar">
          {[
            { to: "/", label: "Головна" },
            { to: "/catalog", label: "Каталог товарів" },
          ].map((item) => (
            <Link to={item.to} id="navLink" key={item.label}>
              <li id="navElement">{item.label}</li>
            </Link>
          ))}
          <Search
            placeholder="Пошук за брендом"
            prefix={<SearchOutlined />}
            style={{ width: 700 }}
            onSearch={onSearch}
            enterButton
          />
        </ul>
      </nav>
      <Modal
        open={isModalOpen}
        title="Кошик"
        width="50%"
        onCancel={handleCancel}
        footer={[
          <div
            key="footer"
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
            }}
          >
            <Button
              key="cancel"
              type="primary"
              danger
              onClick={handleCancel}
              style={{ width: "50%" }}
            >
              Продовжити покупки
            </Button>
            <Button
              key="ok"
              type="primary"
              danger
              loading={checkoutLoading}
              onClick={handleSubmit}
              style={{ width: "50%" }}
            >
              Оформити замовлення
            </Button>
          </div>,
        ]}
      >
        <div>
          {product.length > 0 ? (
            product.map((item) => (
              <div className="cartProduct" key={item.id}>
                <div id="cartProductImg">
                  <img
                    src={getProductImageUrl(item)}
                    alt={item.type_alcohol}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p className="contentProduct">{formatProductTitle(item)}</p>
                  <div>
                    <p>
                      {item.quantity ?? 1} x {item.cost} грн
                    </p>
                  </div>
                  <CloseOutlined
                    style={{ fontSize: 24 }}
                    onClick={() => handleRemoveProduct(item.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <Empty description="Кошик порожній" />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "50px",
            }}
          >
            <p>Усього до сплати:</p>
            <p>{calculateTotalCost(product)} грн.</p>
          </div>
        </div>
      </Modal>
      <AuthModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
}

export default Header;
