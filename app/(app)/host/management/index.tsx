import { View } from "react-native";
import { HEIGHT } from "@src/constants";
import NoResult from "@organisms/no-result";
import { useEffect, useState } from "react";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import HostManagementCard from "@organisms/host-management-card";
import { MyNgoDetailProjectSetQuery, useMyUserDetailProjectSetQuery } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Button, useTheme } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const HostManagementScreen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [hostSet, setHostSet] = useState<MyNgoDetailProjectSetQuery["NGODetail"]["projectSet"]>([]);

  const { loading, data } = useMyUserDetailProjectSetQuery({ fetchPolicy: "network-only" });

  const handleNavigateToCreateHost = () => {
    router.push("host/create");
  };
  useEffect(() => {
    if (!loading && data) {
      setHostSet(data.userDetail.projectSet);
    }
  }, [loading, data]);

  if (loading || !data) return <LoadingIndicator />;

  return (
    <BottomButtonLayout
      contentContainerStyle={{ flex: 1 }}
      buttons={[
        <Button
          color={theme.colors.black}
          icon={<AntDesign name="pluscircleo" size={16} color={theme.colors.white} />}
          onPress={handleNavigateToCreateHost}>
          {tr("add new host")}
        </Button>,
      ]}>
      <ScrollView>
        {!hostSet?.length && (
          <View style={{ height: HEIGHT / 2 }}>
            <NoResult title={tr("no hosting exist")} />
          </View>
        )}
        {hostSet?.map(host => (
          <HostManagementCard host={host} />
        ))}
        <WhiteSpace size={15} />
      </ScrollView>
    </BottomButtonLayout>
  );
};

export default HostManagementScreen;
