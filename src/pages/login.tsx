import { loginApi, LoginInput } from "@/apis/login.api";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function Login() {
  const [form] = Form.useForm();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);

  const { isSuccess, mutate } = useMutation({
    mutationFn: (loginInput: LoginInput) => loginApi(loginInput),
    onSuccess: () => {
      replace("/");
    },
  });

  const onFinish = (values: LoginInput) => {
    setLoading(true);
    mutate(values);
  };

  useEffect(() => {
    console.log("🚀 ~ isSuccess:", isSuccess);
    if (isSuccess) {
      replace("/");
    }
  }, [isSuccess]);

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <h1>Đăng nhập</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email đăng nhập"
          rules={[{ required: true, message: "Vui lòng nhập Email đăng nhập" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
