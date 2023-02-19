import { GuillotinaUser } from "./guillotina";

declare module "iron-session" {
  interface IronSessionData {
    data?: UserSession;
  }
}

export interface UserSession {
  accessToken?: string;
  user?: GuillotinaUser;
  expires?: number;
}
