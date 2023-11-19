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
      indicatorStyle={styles.indicatorStyle}>
      <Tab.Item style={index === 0 ? styles.tabItem(theme) : {}} title={tr("Details")} />
      <Tab.Item style={index === 1 ? styles.tabItem(theme) : {}} title={tr("Capacity")} />
      <Tab.Item style={index === 2 ? styles.tabItem(theme) : {}} title={tr("Origin")} />
      <Tab.Item style={index === 3 ? styles.tabItem(theme) : {}} title={tr("Destination")} />
      <Tab.Item style={index === 4 ? styles.tabItem(theme) : {}} title={tr("Date")} />
      <Tab.Item style={index === 5 ? styles.tabItem(theme) : {}} title={tr("Price")} />
      <Tab.Item style={index === 6 ? styles.tabItem(theme) : {}} title={tr("Images")} />
      <Tab.Item style={index === 7 ? styles.tabItem(theme) : {}} title={tr("Facilities")} />
    </Tab>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    display: "none",
  },
  tabItem: theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.primary,
  }),
});

export default TourCreateTab;
