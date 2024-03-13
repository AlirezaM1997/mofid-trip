import React from "react";
import { Text } from "@rneui/themed";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { ProjectFacilityQueryType, SettingDetailType } from "@src/gql/generated";

const Item = ({ facility }: { facility: ProjectFacilityQueryType }) => {
  const { language } = useSelector(
    (state: RootState) => state.settingDetailSlice.settingDetail as SettingDetailType
  );

  const facilitiesLanguage = () => {
    const lookup: Record<string, string> = {
      AR: "arName",
      EN_US: "enName",
      FA_IR: "faName",
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
    <View>
      <Text subtitle1 bold>
        {tr("hosting facilities")}
      </Text>
      <WhiteSpace />
      <View style={style.container}>
        {facilities?.map((facility, index) => (
          <Item key={index} facility={facility} />
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 8,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  itemContainer: {
    minHeight: 32,
    borderRadius: 6,
    display: "flex",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
  },
  itemText: {
    color: "#101010",
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
});
export default ProjectFacilities;
