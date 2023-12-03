import { Text } from "@rneui/themed";
import { getCapacity } from "@src/helper/tour";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { StyleSheet, View } from "react-native";

const Item = ({ title, subtitle }) => {
  const { localizeNumber } = useLocalizedNumberFormat();

  return (
    <View style={style.itemContainer}>
      <Text heading1 bold>
        {localizeNumber(title)}
      </Text>
      <Text heading2>{subtitle}</Text>
    </View>
  );
};

const ProjectBoldFeatures = ({ capacity }) => {
  const { tr } = useTranslation();
  const totalCapacity = getCapacity(capacity);

  return (
    <View style={style.container}>
      <Item title={totalCapacity} subtitle={tr("Capacity")} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  itemContainer: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingVertical: 18,
  },
});

export default ProjectBoldFeatures;
