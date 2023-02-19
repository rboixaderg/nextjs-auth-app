import { LoginErrorResponse } from "@/errors/errors";
import { AuthContext } from "context/AuthContext";
import { signIn, SignInResponse, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export interface CredentialsData {
  username: string;
  password: string;
}
export function useAuth() {
  // Client only
  const { user, token, update } = useContext(AuthContext);
  const router = useRouter();
  async function login(data: CredentialsData) {
    try {
      const response = (await signIn("credentials", {
        ...data,
        redirect: false,
      })) as unknown as SignInResponse;
      if (response.ok) {
        await update();
        if (router.query["callbackUrl"]) {
          router.push(router.query["callbackUrl"] as string);
        } else {
          router.push("/");
        }
      }
      if (response.error === "CredentialsSignin") {
        throw "CredentialsSignin";
      }
    } catch (error) {
      throw new LoginErrorResponse("credentials error", 401);
    }
  }

  async function logout() {
    await signOut({ redirect: false });
    router.push("/");
  }

  return {
    token: token,
    user,
    isLogged: user !== undefined,
    login,
    logout,
  };
}
