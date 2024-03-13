import { View } from "react-native";
import { router } from "expo-router";
import { HEIGHT } from "@src/constants";
import { useDispatch } from "react-redux";
import NoResult from "@organisms/no-result";
import WhiteSpace from "@atoms/white-space";
import { AntDesign } from "@expo/vector-icons";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import TourManagementCard from "@organisms/tour-management-card";
import BottomButtonLayout from "@components/layout/bottom-button";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";
import { TourQueryType, useMyNgoDetailTourSetQuery } from "@src/gql/generated";

const TourManagement = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { loading, data } = useMyNgoDetailTourSetQuery({
    fetchPolicy: "network-only",
  });
  const handleNavigateToCreateTour = () => {
    router.push("tour/create");
    dispatch(
      setRedirectToScreenAfterLogin({
        pathname: "tour/management",
      })
    );
  };
  if (loading) return <LoadingIndicator />;

  return (
    <BottomButtonLayout
      contentContainerStyle={{ flex: 1 }}
      buttons={[
        <Button
          color={theme.colors.black}
          icon={<AntDesign name="pluscircleo" size={16} color={theme.colors.white} />}
          onPress={handleNavigateToCreateTour}>
          {tr("add new tour")}
        </Button>,
      ]}>
      <ScrollView>
        {!data?.NGODetail?.tourSet?.length && (
          <View style={{ height: HEIGHT / 2 }}>
            <NoResult title={tr("there is no tour")} />
          </View>
        )}
        {data?.NGODetail?.tourSet?.map(tour => (
          <TourManagementCard tour={tour as TourQueryType} />
        ))}
        <WhiteSpace size={15} />
      </ScrollView>
    </BottomButtonLayout>
  );
};

export default TourManagement;
