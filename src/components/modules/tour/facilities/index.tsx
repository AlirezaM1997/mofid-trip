import { Chip } from "@rneui/themed";
import { SettingDetailType, TourFacilityQueryType } from "@src/gql/generated";
import { RootState } from "@src/store";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

type TourFacilitiesProps = {
  facilities: TourFacilityQueryType[];
};

const TourFacilities = ({ facilities, ...props }: TourFacilitiesProps) => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail as SettingDetailType);

  const facilitiesLanguage = () => {
    const lookup: Record<string, string> = {
      "EN_US": "enName",
      "FA_IR": "faName",
      "AR": "arName",
    };
    return lookup[language];
  };

  return (
    <View style={style.container}>
      {facilities?.map((facility, index) => {
        return (
          <Chip
            key={index}
            title={facility[facilitiesLanguage()]}
            type="outline"
            buttonStyle={style.buttonStyle}
            titleStyle={style.titleStyle}
            containerStyle={style.containerStyle}
          />
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
  },
  titleStyle: { color: "#101010" },
  containerStyle: {
    borderRadius: 0,
  },
});

export default TourFacilities;
