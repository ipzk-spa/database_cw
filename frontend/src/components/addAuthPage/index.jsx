import { Modal, Input, Button, Tabs, Form, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";

const { TabPane } = Tabs;


const AuthModal = ({ visible, onClose }) => {
  const handleSubmitRegister = async (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
    try {
      const response = await axios.post("/users", {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      });
      document.cookie = `token=${response.data.accessToken}; path=/; max-age=3600`;
      onClose();
      message.success("Користувач зареєстрований!");
    } catch (error) {
      message.error("Помилка авторизації!");
    }
  };
  const handleSubmitLogin = async (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
    try {
      const response = await axios.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      message.success("Успішний вхід!");
      document.cookie = `token=${response.data.accessToken}; path=/; max-age=3600`;
      onClose();
    } catch (error) {
      alert("Помилка авторизації!");
    }
  };
  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={400}>
      <Tabs defaultActiveKey="login" centered>
        <TabPane tab="Вхід" key="login">
          <Form layout="vertical" onFinish={handleSubmitLogin}>
            <Form.Item
              label="Електронна пошта"
              name="email"
              rules={[
                { required: true, message: "Введіть пошту" },
                { type: "email", message: "Невірний формат пошти" },
              ]}
            >
              <Input placeholder="Введіть пошту" />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Введіть пароль" }]}
            >
              <Input.Password placeholder="Введіть пароль" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Вхід
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <a href="#">Забули пароль?</a>
          </div>
        </TabPane>

        <TabPane tab="Реєстрація" key="register">
          <Form layout="vertical" onFinish={handleSubmitRegister}>
            <Form.Item
              label="Ім'я"
              name="firstName"
              rules={[{ required: true, message: "Введіть ім'я" }]}
            >
              <Input placeholder="Введіть ім'я" />
            </Form.Item>
            <Form.Item
              label="Фамілія"
              name="lastName"
              rules={[{ required: true, message: "Введіть фамілію" }]}
            >
              <Input placeholder="Введіть фамілію" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Введіть пошту" },
                { type: "email", message: "Невірний формат пошти" },
              ]}
            >
              <Input placeholder="Введіть пошту" />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Введіть пароль" }]}
            >
              <Input.Password placeholder="Введіть пароль" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Реєстрація
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;

