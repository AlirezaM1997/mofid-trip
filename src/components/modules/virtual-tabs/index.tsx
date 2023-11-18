import { Tab, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

type TourCreateTabProps = {
  index: number;
};

const TourCreateTab = ({ index }: TourCreateTabProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  const handleChange = newIndex => {
    switch (newIndex) {
      case 0:
        router.push("/tour/create/details");
        break;
      case 1:
        router.push("/tour/create/capacity");
        break;
      case 2:
        router.push("/tour/create/origin");
        break;
      case 3:
        router.push("/tour/create/destination");
        break;
      case 4:
        router.push("/tour/create/date");
        break;
      case 5:
        router.push("/tour/create/price");
        break;
      case 6:
        router.push("/tour/create/images");
        break;
      case 7:
        router.push("/tour/create/facilities");
        break;
    }
  };

  return (
    <Tab
      value={index}
      onChange={handleChange}
      variant="default"
      scrollable
      indicatorStyle={styles.indicatorStyle(theme)}>
      <Tab.Item title={tr("Details")} />
      <Tab.Item title={tr("Capacity")} />
      <Tab.Item title={tr("Origin")} />
      <Tab.Item title={tr("Destination")} />
      <Tab.Item title={tr("Date")} />
      <Tab.Item title={tr("Price")} />
      <Tab.Item title={tr("Images")} />
      <Tab.Item title={tr("Facilities")} />
    </Tab>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: theme => ({
    backgroundColor: theme.colors.primary,
    height: 3,
  })
});

export default TourCreateTab;
