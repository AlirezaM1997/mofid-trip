import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "@src/settings";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { RootState } from "@src/store";
import { LanguageChoiceEnum } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useSession } from "@src/context/auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


const languageCodes = {
  [LanguageChoiceEnum.FaIr]: "fa",
  [LanguageChoiceEnum.EnUs]: "en-US",
  [LanguageChoiceEnum.Ar]: "ar",
};

const customUseApolloClient = () => {
  const { session, isLoading } = useSession();

  const lang = useSelector(
    (state: RootState) =>
      state.settingDetailSlice?.settingDetail?.language || LanguageChoiceEnum.EnUs
  );
  const { tr } = useTranslation();

  const authLink = setContext(async (_, { headers }) => {
    // wait until session fully loaded from LocalStorage/secure-store
    await new Promise(resolve => {
      if (!isLoading) {
        resolve(true);
      }
    });

    let token = "";

    // Wait for the session to be available before retrieving the token
    token = (await JSON.parse(session)?.token) || "";

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
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
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

  const httpLink = createUploadLink({
    uri: API_URL,
  });

  const appLink = from([authLink, errorLink, httpLink]);

  return new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
  });
};

export default customUseApolloClient;
