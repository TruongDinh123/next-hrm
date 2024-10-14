import { Button, Form, Input, message } from "antd";
import { useMutation } from "react-query";
import bgLogin from "@/app/public/bg-login.png";
import { registerApi, RegisterInput } from "@/apis/register.api";

export default function Register() {
  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      message.success(
        "Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản.",
        5
      );
    },
    onError: () => {
      message.error("Đăng ký thất bại");
    },
  });

  const onFinish = (values: RegisterInput) => {
    mutate(values);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgLogin.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 300,
          margin: "100px auto",
          color: "whitesmoke",
          backgroundColor: "rgba(0, 0, 0, 0.147)",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h1>Đăng ký</h1>
        <Form form={form} size="large" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label={<span style={{ color: "white" }}>Email</span>}
            rules={[{ required: true, message: "Vui lòng nhập Email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label={<span style={{ color: "white" }}>Tên</span>}
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>Mật khẩu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
