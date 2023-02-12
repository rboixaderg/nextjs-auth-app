import { getSession, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { GuillotinaUser } from "types/guillotina";

export type UserContextType = {
  user: GuillotinaUser | undefined;
  token: string | undefined;
  clear: () => void;
  update: () => void;
  isLoadingSession: boolean;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<UserContextType>({
  user: undefined,
  token: undefined,
  clear: () => {},
  update: () => {},
  isLoadingSession: false,
});

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<GuillotinaUser | undefined>(session?.user);
  const [token, setToken] = useState<string | undefined>(session?.accessToken);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(false);

  useEffect(() => {
    if (session && "user" in session) {
      setUser(session.user);
      setToken(session.accessToken);
    }
    setIsLoadingSession(status === "loading");
  }, [session, status]);

  async function update() {
    const session = await getSession();
    if (session && "user" in session) {
      setUser(session.user);
      setToken(session.accessToken);
    } else {
      clear();
    }
  }

  function clear() {
    setUser(undefined);
    setToken(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoadingSession,
        clear,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
