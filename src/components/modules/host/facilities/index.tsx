import { Chip } from "@rneui/themed";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import { SettingDetailType, TourFacilityQueryType } from "@src/gql/generated";

const ProjectFacilities = ({ facilities }: { facilities: TourFacilityQueryType[] }) => {
  const { localizeNumber } = useLocalizedNumberFormat();
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
    <View style={style.container}>
      {facilities?.map((facility, index) => {
        return (
          <Chip
            key={index}
            type="outline"
            titleStyle={style.titleStyle}
            buttonStyle={style.buttonStyle}
            containerStyle={style.containerStyle}
            title={localizeNumber(facility[facilitiesLanguage()])}
          />
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  buttonStyle: {
    padding: 2,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: "#F3F3F3",
  },
  titleStyle: {textAlign:'right' ,color: "#101010" },
  containerStyle: {
    borderRadius: 0,
    maxWidth: "100%",
  },
});

export default ProjectFacilities;
