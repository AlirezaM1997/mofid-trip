import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "@src/settings";
// import { navigationRef } from "@src/utils/root-navigation"
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { RootState } from "@src/store";
import { LanguageChoiceEnum } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";

const languageCodes = {
  [LanguageChoiceEnum.FaIr]: "fa",
  [LanguageChoiceEnum.EnUs]: "en-US",
  [LanguageChoiceEnum.Ar]: "ar",
};

const customUseApolloClient = () => {
  const { token } = useSelector((state: RootState) => state.authSlice?.loginData ?? '');
  const lang = useSelector(
    (state: RootState) => state.settingDetailSlice?.settingDetail?.language || LanguageChoiceEnum.EnUs
  );
  const { tr } = useTranslation();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Accept-Language": languageCodes[lang],
        authorization: token ? `JWT ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(error => {
        if (error.message === "'AnonymousUser' object is not iterable") {
          window.location.href = "/authentication";
          // navigationRef.navigate("LoginScreen")
        } else if (error.message === "You do not have permission to perform this action") {
          // navigationRef.navigate("LoginScreen")
        }
      });
    }

    if (networkError) {
      // handle network error
      // toast.error(networkError.message);

      // Temporarily silent. I think there is a bug in @apollo/client
      if (networkError.statusCode !== 400) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: JSON.stringify(networkError.message),
        });
      }
      if (networkError.statusCode !== 429) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: tr("Too many tries! please try again in the future"),
        });
      }
    }
  });

  const httpLink = createHttpLink({
    uri: API_URL,
  });

  const appLink = from([authLink, errorLink, httpLink]);

  return new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
  });
};

export default customUseApolloClient;
