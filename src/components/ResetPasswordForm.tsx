import { resetPasswordApi } from "@/apis/resetPassword.api";
import { User } from "@/models/user.model";
import { Button, Form, Input, message } from "antd";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const { mutate, isLoading } = useMutation<
    AxiosResponse<User>,
    Error,
    { token: string; newPassword: string }
  >(({ token, newPassword }) => resetPasswordApi(token, newPassword), {
    onSuccess: (data) => {
      message.success(data.data.message);
      router.push("/login");
    },
  });

  const onFinish = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    mutate({ token, newPassword: values.newPassword });
  };
  
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          { required: true, message: "Please input your new password" },
          { min: 6, message: "Password must be at least 6 characters long" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: "Please confirm your new password" },
          { min: 6, message: "Password must be at least 6 characters long" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}
