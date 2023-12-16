import React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import { ProjectFacilityQueryType } from "@src/gql/generated";

type PropsType = {
  facility: ProjectFacilityQueryType;
};

const Item = ({ facility }: PropsType) => {
  return (
    <View style={style.itemContainer}>
      <Text style={style.itemText}>{facility.enName}</Text>
    </View>
  );
};

const ProjectFacilities = ({ facilities }) => {
  const { tr } = useTranslation();

  if (!facilities || !facilities.length) return;

  return (
    <View style={style.container}>
      <TitleWithAction
        size="subtitle1"
        actionTitle={tr("See All")}
        title={tr("hosting facilities")}
      />
      {facilities?.map((facility, index) => (
        <Item key={index} facility={facility} />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  itemContainer: {
    backgroundColor: "#F3F3F3",
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  itemText: {
    color: "#101010",
    paddingHorizontal: 12,
  },
});
export default ProjectFacilities;
