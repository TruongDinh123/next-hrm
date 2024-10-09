import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { AppProps } from "next/app";
import { useState } from "react";
import AuthProvider from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider>
          <Component {...pageProps} />
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
