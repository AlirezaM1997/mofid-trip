import { RootState } from "@src/store";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import customUseApolloClient from "../apollo/client";
import { gql } from "@apollo/client";
import { setIsAuthenticated } from "@src/slice/auth-slice";

export const useIsAuthenticated = () => {
  return useSelector((state: RootState) => state.authSlice.isAuthenticated);
}

export const useConfirmAuthentication = () => {
  const client = customUseApolloClient();
  const dispatch = useDispatch();

  const confirmAuth = () => {
    client
      .query({
        query: gql`
          {
            userDetail {
              id
            }
          }
        `,
      })
      .then(({ data, error }) => {
        dispatch(setIsAuthenticated(true));
      })
      .catch(error => {
        dispatch(setIsAuthenticated(false));
      });
  };
  return { confirmAuth };
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
