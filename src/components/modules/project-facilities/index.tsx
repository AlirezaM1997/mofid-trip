import React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { FacilityType } from "@src/gql/generated";
import TitleWithAction from "../title-with-action";
import useTranslation from "@src/hooks/translation";

type PropsType = {
  facility: FacilityType;
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
      <TitleWithAction title="What this place offers" actionTitle={tr("See All")} />
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
    gap: 7,
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
