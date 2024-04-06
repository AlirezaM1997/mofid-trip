import React, { useEffect } from "react";
import { I18nManager } from "react-native";
import { useSession } from "@src/context/auth";
import NGOProfile from "@organisms/profile/ngo";
import UserProfile from "@organisms/profile/user";
import { useRootNavigationState } from "expo-router";
import Authentication from "@modules/authentication";
import { useIsFocused } from "@react-navigation/core";
import LoadingIndicator from "@modules/Loading-indicator";
import { UserQueryType, useUserDetailProfileLazyQuery } from "@src/gql/generated";
import { Text } from "@rneui/themed";

const Profile: React.FC = () => {
  I18nManager.allowRTL(true);
  const isFocused = useIsFocused();
  const { session, isLoading, signOut } = useSession();
  const rootNavigationState = useRootNavigationState();
  const [_, { refetch, data }] = useUserDetailProfileLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    isFocused && session && refetch();
  }, [isFocused, session]);

  useEffect(() => {
    fetch(
      "https://mofidtripst.s3.ir-thr-at1.arvanstorage.ir/static/images/005f18a5-4b8e-44d4-bff3-bf03a5aaaa84_large.png",
      {
        headers: {
          accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "accept-language": "en,fa;q=0.9,en-US;q=0.8,ar;q=0.7",
          "sec-fetch-dest": "image",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "cross-site",
          "Cache-Control": "no-cache", // Disable caching
          "Pragma": "no-cache", // Additional header for older HTTP/1.0 caches
        },
        referrer: "http://localhost:8081/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );
  }, []);

  if (!isLoading && !session) return <Authentication />;
  if (!data) return <LoadingIndicator />;

  // if you open new tab and enter page url in addressbar and try to open, you see an error. the error described in
  // https://stackoverflow.com/questions/76828511/expo-router-error-attempted-to-navigate-before-mounting-the-root-layout-compone
  // we should use this line of code to render page if navigation was ready
  if (!rootNavigationState?.key) return null;

  const userDetail = data.userDetail;
  return userDetail?.isNgo ? (
    <NGOProfile userDetail={userDetail as UserQueryType} />
  ) : (
    <UserProfile userDetail={userDetail as UserQueryType} />
  );
};

export default Profile;
