import { getSession } from "@/services/session";
import { UserSession } from "@/types/session";
import { GetServerSidePropsContext } from "next";

export async function getSessionSSR(
  context: GetServerSidePropsContext
): Promise<UserSession | null> {
  const { req: request } = context;
  const sessionData = await getSession(request.session.data);
  if (sessionData) {
    request.session.data = sessionData;
    await request.session.save();
    return sessionData;
  } else {
    request.session.destroy();
    return null;
  }
}
