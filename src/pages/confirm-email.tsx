import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { confirmEmailApi } from "@/apis/authentication.api";

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (token) {
      confirmEmail(token as string);
    }
  }, [token]);

  const confirmEmail = async (confirmationToken: string) => {
    try {
      await confirmEmailApi(confirmationToken);
      setIsConfirmed(true);
      message.success("Email đã được xác nhận thành công!");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      console.error("Lỗi xác nhận email:", error);
      message.error("Xác nhận email thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>
        {isConfirmed ? "Xác nhận email thành công!" : "Xác nhận email thất bại"}
      </h1>
      <p>
        {isConfirmed
          ? "Tài khoản của bạn đã được xác nhận. Bạn sẽ được chuyển hướng đến trang đăng nhập trong vài giây."
          : "Có lỗi xảy ra trong quá trình xác nhận email. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
      </p>
    </div>
  );
}
