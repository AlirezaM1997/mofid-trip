import { Chip } from "@rneui/themed";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import { SettingDetailType, TourFacilityQueryType } from "@src/gql/generated";

const TourFacilities = ({ facilities }: { facilities: TourFacilityQueryType[] }) => {
  const { localizeNumber } = useLocalizedNumberFormat();
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
    <View style={style.container}>
      {facilities?.map((facility, index) => {
        return (
          <Chip
            key={index}
            type="outline"
            titleStyle={style.titleStyle}
            buttonStyle={style.buttonStyle}
            containerStyle={style.containerStyle}
            title={localizeNumber(facility[facilitiesLanguage()] as string)}
          />
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 5,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  buttonStyle: {
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: "#F3F3F3",
  },
  titleStyle: { color: "#101010", textAlign: "right", paddingVertical: 2 },
  containerStyle: {
    borderRadius: 0,
    maxWidth: "100%",
  },
});

export default TourFacilities;
