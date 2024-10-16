import { resendConfirmationLinkApi } from "@/apis/resendLink.apit";
import { Button, message } from "antd";
import { useMutation } from "react-query";

interface ResendConfirmEmailButtonProps {
  email: string;
  onEmailResent: () => void;
}

export default function ResendConfirmEmailButton({
  email,
  onEmailResent,
}: ResendConfirmEmailButtonProps) {
  const { mutate, isLoading } = useMutation(
    () => resendConfirmationLinkApi(email),
    {
      onSuccess: (data) => {
        message.success(
          data.data.message || "Gửi lại email xác nhận thành công"
        );
        onEmailResent();
      },
      onError: (error: any) => {
        if (error.response?.status === 400) {
          message.error(
            error.response.data.message || "Email đã được xác nhận"
          );
        } else {
          message.error("Có lỗi xảy ra khi gửi lại email xác nhận");
        }
      },
    }
  );

  const onFinish = () => {
    mutate();
  };

  return (
    <div>
      <Button type="primary" onClick={onFinish} loading={isLoading} block>
        Gửi lại email xác nhận
      </Button>
    </div>
  );
}
