import { View } from "react-native";
import { HEIGHT } from "@src/constants";
import NoResult from "@organisms/no-result";
import { useEffect, useState } from "react";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import HostManagementCard from "@organisms/host-management-card";
import { MyNgoDetailProjectSetQuery, useMyUserDetailProjectSetQuery } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";

const HostManagementScreen = () => {
  const { tr } = useTranslation();
  const [hostSet, setHostSet] = useState<MyNgoDetailProjectSetQuery["NGODetail"]["projectSet"]>([]);

  const { loading, data } = useMyUserDetailProjectSetQuery({ fetchPolicy: "network-only" });

  useEffect(() => {
    if (!loading && data) {
      setHostSet(data.userDetail.projectSet);
    }
  }, [loading, data]);

  if (loading || !data) return <LoadingIndicator />;

  return (
    <ScrollView>
      {!hostSet?.length && (
        <View style={{ height: HEIGHT / 2 }}>
          <NoResult title={tr("no hosting exist")} />
        </View>
      )}
      {hostSet?.map(host => (
        <HostManagementCard host={host} />
      ))}
    </ScrollView>
  );
};

export default HostManagementScreen;
