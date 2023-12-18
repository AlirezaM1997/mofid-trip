import moment from "jalali-moment";
import { Text } from "@rneui/themed";
import { Divider } from "@rneui/base";
import WhiteSpace from "@atoms/white-space";
import { getCapacity } from "@src/helper/tour";
import { StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Item = ({ title, subtitle }) => {
  return (
    <View>
      <Text caption type="grey2" center>
        {title}
      </Text>

      <WhiteSpace size={6} />

      <Text body2 bold center>
        {subtitle}
      </Text>
    </View>
  );
};

const ProjectBoldFeatures = ({ capacity, dateStart, dateEnd, category }) => {
  const { tr } = useTranslation();
  const totalCapacity = getCapacity(capacity);
  const { localizeNumber } = useLocalizedNumberFormat();
  const dateConvertor = date => localizeNumber(moment(date).locale("fa").format("jMMMM jDD"));

  return (
    <View style={style.container}>
      <Item
        title={tr("hosting date")}
        subtitle={`${dateConvertor(dateStart)} - ${dateConvertor(dateEnd)}`}
      />
      <Divider orientation="vertical" />

      <Item subtitle={category} title={tr("hosting type")} />

      <Divider orientation="vertical" />

      <Item
        title={tr("daily capacity")}
        subtitle={`${localizeNumber(totalCapacity)} ${tr("person")}`}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProjectBoldFeatures;
