import { authenticationApi } from "@/apis/authentication.api";
import { AuthContext } from "@/context/auth.context";
import { useRefresh } from "@/hooks/useRefresh";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const queryResult = useQuery("authentication", authenticationApi, {
    retry: 1,
    refetchOnWindowFocus: true,
  });
  useRefresh(queryResult);
  const { pathname } = useRouter();

  const {
    isSuccess: isAuthenticated,
    isFetched,
    data: authenticationResult,
  } = queryResult;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated && isFetched) setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (pathname === "/login") {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ user: authenticationResult?.data, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
