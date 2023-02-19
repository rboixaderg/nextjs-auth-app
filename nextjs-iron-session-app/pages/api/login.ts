// pages/api/login.ts

import { sessionOptions } from "@/lib/sessionOptions";
import { UserSession } from "@/types/session";
import { withIronSessionApiRoute } from "iron-session/next";

import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;
  try {
    // Get token from guillotina
    let user = null;
    let userData = null;
    try {
      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GUILLOTINA}@login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password ?? "",
            username: username ?? "",
          }),
        }
      );
      if (!loginResponse.ok) {
        res.status(401);
        res.json({});
        return;
      }
      const loginResponseData = await loginResponse.json();
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_GUILLOTINA}users/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginResponseData.token}`,
          },
        }
      );
      if (userResponse.ok) {
        userData = await userResponse.json();
      }
      user = {
        accessToken: loginResponseData.token,
        user: userData,
        expires: JSON.parse(
          Buffer.from(
            loginResponseData.token.split(".")[1],
            "base64"
          ).toString()
        ).exp,
      } as UserSession;
      req.session.data = user;
      await req.session.save();
    } catch (err) {
      console.error(err);
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
