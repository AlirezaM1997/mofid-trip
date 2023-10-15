import { RootState } from "@src/store";
import { useSelector } from "react-redux";

export const useIsAuthenticated = () => {
  const { loginData } = useSelector((state: RootState) => state.userSlice);
  return loginData && "token" in loginData;
};
