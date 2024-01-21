import LoadingIndicator from "@modules/Loading-indicator";
import Authentication from "@modules/authentication";
import { useIsFocused } from "@react-navigation/native";
import { useSession } from "@src/context/auth";
import { useRootNavigationState } from "expo-router";
import React, { useEffect } from "react";
import { I18nManager } from "react-native";
import NGOProfile from "@organisms/profile/ngo";
import UserProfile from "@organisms/profile/user";
import { useUserDetailLazyQuery } from "@src/gql/generated";

const Profile: React.FC = () => {
  const { session } = useSession();
  const rootNavigationState = useRootNavigationState();
  const [_, { refetch, data }] = useUserDetailLazyQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const isFocused = useIsFocused();

  I18nManager.allowRTL(true);

  // if you open new tab and enter page url in addressbar and try to open, you see an error. the error described in
  // https://stackoverflow.com/questions/76828511/expo-router-error-attempted-to-navigate-before-mounting-the-root-layout-compone
  // we should use this line of code to render page if navigation was ready
  if (!rootNavigationState?.key) return null;

  useEffect(() => {
    refetch();
  }, [isFocused]);

  if (!session) return <Authentication />;

  if (!data) return <LoadingIndicator />;

  const userDetail = data.userDetail;

  return userDetail?.isNgo ? <NGOProfile /> : <UserProfile />;
};

export default Profile;
