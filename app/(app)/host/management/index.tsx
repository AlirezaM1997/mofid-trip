import { router } from "expo-router";
import { View } from "react-native";
import { HEIGHT } from "@src/constants";
import { useEffect, useState } from "react";
import NoResult from "@organisms/no-result";
import WhiteSpace from "@atoms/white-space";
import { AntDesign } from "@expo/vector-icons";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import HostManagementCard from "@organisms/host-management-card";
import BottomButtonLayout from "@components/layout/bottom-button";
import { ProjectQueryType, useMyUserDetailProjectSetQuery } from "@src/gql/generated";

const HostManagementScreen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [hostSet, setHostSet] = useState<ProjectQueryType[]>([]);

  const { loading, data } = useMyUserDetailProjectSetQuery({ fetchPolicy: "network-only" });

  const handleNavigateToCreateHost = () => {
    router.push("host/create");
  };
  useEffect(() => {
    if (!loading && data) {
      setHostSet(data?.userDetail?.projectSet as ProjectQueryType[]);
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
