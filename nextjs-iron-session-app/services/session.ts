import { MINUTES_LEFT_EXPIRE_TOKEN } from "@/core/constants";
import { UserSession } from "@/types/session";
import { refreshAccessToken } from "./refreshToken";

export async function getSession(
  sessionData: UserSession | undefined
): Promise<UserSession | null> {
  const currentTime = new Date().getTime() / 1000;
  if (
    currentTime < (sessionData?.expires ?? 0) &&
    currentTime + MINUTES_LEFT_EXPIRE_TOKEN * 60 > (sessionData?.expires ?? 0)
  ) {
    try {
      const data = await refreshAccessToken(sessionData!);
      return data;
    } catch (err) {
      return null;
    }
  }

  if (currentTime < (sessionData?.expires ?? 0)) {
    return sessionData!;
  } else {
    return null;
  }
}
