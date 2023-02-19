import { CustomError } from "@/types/global";
import { UserSession } from "@/types/session";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
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
  session: UserSession;
}

export const AuthContext = createContext<UserContextType>({
  user: undefined,
  token: undefined,
  clear: () => {},
  update: () => {},
  isLoadingSession: false,
});

const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as CustomError;
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const privatePages = ["/private"];
export function AuthContextProvider({
  children,
  session: sessionProp,
}: AuthContextProviderProps) {
  const { mutate, isLoading } = useSWR<UserSession>("/api/user", fetcher);
  const [session, setSession] = useState<UserSession | undefined>(sessionProp);

  useEffect(() => {
    if (sessionProp && "user" in sessionProp) {
      setSession(sessionProp);
    } else {
      clear();
    }
  }, [sessionProp]);

  async function update() {
    const session = await mutate();
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
        isLoadingSession: isLoading,
        clear,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
