import { RootState } from "@src/store";
import { router } from "expo-router";
import { useSelector } from "react-redux";

export const useIsAuthenticated = () => {
  const { loginData } = useSelector((state: RootState) => state.userSlice);
  return loginData && "token" in loginData;
};

export const ifNotLoggedInRedirectTo = (path: string) => {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) {
    router.push({
      pathname: "/authentication",
      params: { protectedScreen: path },
    });
    return;
  }
};
