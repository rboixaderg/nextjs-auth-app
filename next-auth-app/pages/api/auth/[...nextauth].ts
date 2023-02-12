import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

async function refreshAccessToken(jsonWebToken: JWT) {
  console.log("refreshAccessToken");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GUILLOTINA}@login-renew`,
      {
        body: new URLSearchParams({}),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${jsonWebToken.accessToken}`,
        },
        method: "POST",
      }
    );
    const tokenGuillotina = await response.json();
    if (!response.ok) {
      throw tokenGuillotina;
    }

    return {
      ...jsonWebToken,
      accessToken: tokenGuillotina.token,
      expires: JSON.parse(
        Buffer.from(tokenGuillotina.token.split(".")[1], "base64").toString()
      ).exp,
    };
  } catch (error) {
    console.log("refreshAccessToken", error);
    return {
      ...jsonWebToken,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GUILLOTINA}@login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: credentials?.password ?? "",
            username: credentials?.username ?? "",
          }),
        }
      );

      if (loginResponse.ok) {
        const loginResponseData = await loginResponse.json();
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_GUILLOTINA}users/${credentials?.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginResponseData.token}`,
            },
          }
        );
        let userData = null;
        if (userResponse.ok) {
          userData = await userResponse.json();
        }

        return {
          ...loginResponseData,
          user: userData,
        };
      } else {
        return null;
      }
    },
  }),
];

const MINUTES_LEFT_EXPIRE_TOKEN = 30;
const callbacks = {
  async jwt({ token, user }: { token: JWT; user?: User }) {
    if (user) {
      return {
        accessToken: user.token,
        expires: JSON.parse(
          Buffer.from(user.token.split(".")[1], "base64").toString()
        ).exp,
        user: user.user,
      };
    }
    const currentTime = new Date().getTime() / 1000;
    if (
      currentTime < (token?.expires ?? 0) &&
      currentTime + MINUTES_LEFT_EXPIRE_TOKEN * 60 > (token?.expires ?? 0)
    ) {
      return refreshAccessToken(token);
    }

    if (currentTime < (token?.expires ?? 0)) {
      return token;
    }

    return {};
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    if (token && Object.keys(token).length > 0) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.expires = token.expires;
      return session;
    }
    return {} as Session;
  },
};

export const authOptions: AuthOptions = {
  providers,
  callbacks,
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1h
  },
};

export default NextAuth(authOptions);
