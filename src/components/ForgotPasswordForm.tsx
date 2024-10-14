import { Button, Form, Input } from "antd";
import { ForgotPasswordInput } from "@/apis/forgotPassword.api";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const [form] = Form.useForm();

  const { forgotPassword, isLoading } = useForgotPassword();

  const onFinish = (values: ForgotPasswordInput) => {
    forgotPassword(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}
