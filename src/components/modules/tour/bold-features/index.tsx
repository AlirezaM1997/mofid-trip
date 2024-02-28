import moment from "jalali-moment";
import { Text } from "@rneui/themed";
import { Divider } from "@rneui/base";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Item = ({ title, subtitle }) => {
  return (
    <View>
      <Text caption type="grey3">
        {title}
      </Text>

      <WhiteSpace size={6} />

      <Text body2 bold center>
        {subtitle}
      </Text>
    </View>
  );
};

const TourBoldInfo = ({ capacity, startTime, endTime }) => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const dateConvertor = date => localizeNumber(moment(date).locale("fa").format("jDD jMMMM"));

  const gender = () => {
    const obj: Record<string, string> = {
      BOTH: "خانم و آقا",
      FEMALE: "خانم",
      MALE: "آقا",
    };

    return obj[capacity.gender];
  };
  const s = moment(startTime, "YYYY-MM-DDTHH:mm:ssZ");
  const e = moment(endTime, "YYYY-MM-DDTHH:mm:ssZ");

  const differenceInDays = e.diff(s, "days");

  return (
    <View style={style.container}>
      <Item
        title={tr("date")}
        subtitle={`${dateConvertor(startTime)} - ${dateConvertor(endTime)}`}
      />
      <Divider orientation="vertical" />

      <Item subtitle={`${differenceInDays} ${tr("day")}`} title={tr("Duration")} />
      <Divider orientation="vertical" />

      <Item
        title={tr("daily capacity")}
        subtitle={`${localizeNumber(capacity.guestNumber ?? 0)} ${tr("person")} (${gender()})`}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TourBoldInfo;
