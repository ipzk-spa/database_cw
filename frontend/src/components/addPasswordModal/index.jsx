import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { getAuthHeaders } from "../../utils/helpers";


const ChangePasswordModal = ({
  visible,
  onClose,
  id
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { oldPassword, newPassword, confirmPassword } = values;
      await axios.patch(
        `/users/update-password/${id}`,
        { oldPassword, newPassword, confirmPassword },
        { headers: getAuthHeaders() }
      );

      message.success("Пароль успішно змінено");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Сталася помилка при зміні пароля");
    }
  };

  return (
    <Modal
      title="Змінити пароль"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Скасувати
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Змінити пароль
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="changePasswordForm"
        layout="vertical"
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
      >
        <Form.Item
          label="Старий пароль"
          name="oldPassword"
          rules={[
            { required: true, message: "Будь ласка, введіть старий пароль!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Новий пароль"
          name="newPassword"
          rules={[
            { required: true, message: "Будь ласка, введіть новий пароль!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Підтвердження нового пароля!"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Будь ласка, підтвердіть новий пароль!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;

