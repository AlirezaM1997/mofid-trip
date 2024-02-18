import React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { ProjectFacilityQueryType, SettingDetailType } from "@src/gql/generated";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

const Item = ({ facility }: { facility: ProjectFacilityQueryType }) => {
  const { language } = useSelector(
    (state: RootState) => state.settingDetailSlice.settingDetail as SettingDetailType
  );

  const facilitiesLanguage = () => {
    const lookup: Record<string, string> = {
      EN_US: "enName",
      FA_IR: "faName",
      AR: "arName",
    };
    return lookup[language];
  };

  return (
    <View style={style.itemContainer}>
      <Text style={style.itemText}>{facility[facilitiesLanguage()]}</Text>
    </View>
  );
};

const ProjectFacilities = ({ facilities }: { facilities: ProjectFacilityQueryType[] }) => {
  const { tr } = useTranslation();

  if (!facilities || !facilities.length) return;

  return (
    <View style={style.container}>
      <Text subtitle1>{tr("hosting facilities")}</Text>
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
