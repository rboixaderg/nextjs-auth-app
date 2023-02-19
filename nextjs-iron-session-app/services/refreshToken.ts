import { UserSession } from "@/types/session";

export async function refreshAccessToken(session: UserSession) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GUILLOTINA}@login-renew`,
    {
      body: new URLSearchParams({}),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${session.accessToken}`,
      },
      method: "POST",
    }
  );

  const tokenGuillotina = await response.json();

  if (!response.ok) {
    throw "Error refresh token";
  }

  return {
    ...session,
    accessToken: tokenGuillotina.token,
    expires: JSON.parse(
      Buffer.from(tokenGuillotina.token.split(".")[1], "base64").toString()
    ).exp,
  };
}
