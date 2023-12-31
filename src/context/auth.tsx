import React from "react";
import { useStorageState } from "@src/hooks/auth/storage-state";

type AuthTokenType = {
  token: string;
  refreshToken: string;
  metadata: any
};

const AuthContext = React.createContext<{
  signIn: (authToken: AuthTokenType) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[], setReduxPersist] = useStorageState("persist:root");

  return (
    <AuthContext.Provider
      value={{
        signIn: authToken => {
          setSession(JSON.stringify(authToken));
        },
        signOut: () => {
          setSession(null);
          setReduxPersist(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
