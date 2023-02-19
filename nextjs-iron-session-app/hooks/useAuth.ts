import { LoginErrorResponse } from "@/errors/errors";
import { AuthContext } from "context/AuthContext";

import { useRouter } from "next/router";
import { useContext } from "react";

export interface CredentialsData {
  username: string;
  password: string;
}
export function useAuth() {
  // Client only
  const { user, token, clear, update, isLoadingSession } =
    useContext(AuthContext);
  const router = useRouter();
  async function login(data: CredentialsData) {
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        await update();
        if (router.query["callbackUrl"]) {
          router.push(router.query["callbackUrl"] as string);
        } else {
          router.push("/");
        }
      }

      if (response.status === 401) {
        throw "CredentialsSignin";
      }
    } catch (error) {
      throw new LoginErrorResponse("credentials error", 401);
    }
  }

  async function logout() {
    await fetch(`/api/logout`);
    clear();
    router.push("/");
  }

  return {
    token: token,
    user,
    isLogged: user !== undefined,
    isLoading: isLoadingSession,
    login,
    logout,
  };
}
