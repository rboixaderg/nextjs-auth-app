// pages/api/user.ts

import { sessionOptions } from "@/lib/sessionOptions";
import { getSession } from "@/services/session";
import { UserSession } from "@/types/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserSession>
) {
  const sessionData = await getSession(req.session.data);
  if (sessionData) {
    req.session.data = sessionData;
    await req.session.save();
    res.json(sessionData);
    return;
  } else {
    req.session.destroy();
    res.status(401);
    res.json({});
  }
}
