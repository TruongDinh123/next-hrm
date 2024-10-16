import { authenticationApi } from "@/apis/authentication.api";
import { AuthContext } from "@/context/auth.context";
import { useRefresh } from "@/hooks/useRefresh";
import { Spin } from "antd";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryResult = useQuery("authentication", authenticationApi, {
    retry: 0,
    refetchOnWindowFocus: true,
  });
  useRefresh(queryResult);

  const {
    isSuccess: isAuthenticated,
    isFetched,
    data: authenticationResult,
  } = queryResult;

  useEffect(() => {
    if (isAuthenticated && isFetched) setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/confirm-email") {
      setIsLoading(false);
    }
  }, [pathname]);

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
    <AuthContext.Provider
      value={{ user: authenticationResult?.data, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
