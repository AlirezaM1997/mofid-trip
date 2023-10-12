import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BASE_URL } from "@src/settings";
import { ApolloLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { RootState } from "./store";
import { useSelector } from "react-redux";

export default function useApolloClient() {
  const { tokenAuth } = useSelector((state: RootState) => state.token);

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      // TODO: implement error handling
    }
  );

  const authLink = setContext((_, { headers }) => {
    if (tokenAuth.token) {
      const authorization = tokenAuth.token ? `JWT ${tokenAuth.token}` : "";
      return {
        headers: {
          ...headers,
          authorization: authorization,
        },
      };
    }
    return {
      headers: headers,
    };
  });

  const httpLink = createHttpLink({
    uri: BASE_URL + "/gql/",
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
