import "next-auth";
import "next-auth/jwt";
import { GuillotinaUser } from "./guillotina";

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken;
    user?: GuillotinaUser;
    expires?: number;
  }
  interface User {
    token: string;
    exp: string;
    user: GuillotinaUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken;
    expires?: number;
    user?: GuillotinaUser;
  }
}
