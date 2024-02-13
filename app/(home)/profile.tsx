import React, { useEffect } from "react";
import { I18nManager } from "react-native";
import { useSession } from "@src/context/auth";
import NGOProfile from "@organisms/profile/ngo";
import UserProfile from "@organisms/profile/user";
import { useRootNavigationState } from "expo-router";
import Authentication from "@modules/authentication";
import { useIsFocused } from "@react-navigation/core";
import LoadingIndicator from "@modules/Loading-indicator";
import { useUserDetailProfileQuery } from "@src/gql/generated";

const Profile: React.FC = () => {
  I18nManager.allowRTL(true);
  const { session } = useSession();
  const isFocused = useIsFocused();
  const rootNavigationState = useRootNavigationState();
  const { refetch, data, loading } = useUserDetailProfileQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [isFocused]);

  if (!loading && !session) return <Authentication />;

  if (!data) return <LoadingIndicator />;

  // if you open new tab and enter page url in addressbar and try to open, you see an error. the error described in
  // https://stackoverflow.com/questions/76828511/expo-router-error-attempted-to-navigate-before-mounting-the-root-layout-compone
  // we should use this line of code to render page if navigation was ready
  if (!rootNavigationState?.key) return null;

  const userDetail = data.userDetail;

  return userDetail?.isNgo ? (
    <NGOProfile userDetail={userDetail} />
  ) : (
    <UserProfile userDetail={userDetail} />
  );
};

export default Profile;
