import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import { useMyNgoDetailTourSetQuery } from "@src/gql/generated";
import { View } from "react-native";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import { HEIGHT } from "@src/constants";
import NoResult from "@organisms/no-result";
import TourManagementCard from "@organisms/tour-management-card";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Button, useTheme } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const TourManagement = () => {
  const { tr } = useTranslation();
  const {theme} = useTheme();
  const { loading, data } = useMyNgoDetailTourSetQuery({
    fetchPolicy: "network-only",
  });
const handleNavigateToCreateTour = ()=>{
  router.push("tour/create")
}
  if (loading) return <LoadingIndicator />;

  return (
    <BottomButtonLayout
      contentContainerStyle={{ flex: 1 }}
      buttons={[
        <Button
          color={theme.colors.black}
          loading={loading}
          icon={<AntDesign name="pluscircleo" size={16} color={theme.colors.white} />}
          onPress={handleNavigateToCreateTour}>
          {tr("add new tour")}
        </Button>,
      ]}>
      <ScrollView>
        {!data?.NGODetail?.tourSet.length && (
          <View style={{ height: HEIGHT / 2 }}>
            <NoResult title={tr("there is no tour")} />
          </View>
        )}
        {data?.NGODetail?.tourSet?.map(tour => (
          <TourManagementCard tour={tour} />
        ))}
        <WhiteSpace size={15} />
      </ScrollView>
    </BottomButtonLayout>
  );
};

export default TourManagement;
