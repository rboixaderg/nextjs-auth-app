import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { GuillotinaUser } from "types/guillotina";

export type UserContextType = {
  user: GuillotinaUser | undefined;
  token: string | undefined;
  clear: () => void;
  update: () => void;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
  session: Session;
}

export const AuthContext = createContext<UserContextType>({
  user: undefined,
  token: undefined,
  clear: () => {},
  update: () => {},
});

export function AuthContextProvider({
  children,
  session: sessionProps,
}: AuthContextProviderProps) {
  const [session, setSession] = useState<Session | undefined>(
    sessionProps ?? undefined
  );
  useEffect(() => {
    if (sessionProps && "user" in sessionProps) {
      setSession(sessionProps);
    } else {
      clear();
    }
  }, [sessionProps]);

  async function update() {
    const session = await getSession();
    if (session && "user" in session) {
      setSession(session);
    } else {
      clear();
    }
  }

  function clear() {
    setSession(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user,
        token: session?.accessToken,
        clear,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
