import React from "react";
import moment from "jalali-moment";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import JalaliDatePicker from "@modules/jalali-date-picker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useProjectCapacityListQuery } from "@src/gql/generated";

const calendarManagementScreen = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { name, hostId, dateEnd, dateStart } = useLocalSearchParams();

  navigation.setOptions({ title: name });

  const start = moment(dateStart).format("YYYY-MM-DD");
  const end = moment(dateEnd).format("YYYY-MM-DD");

  const { data, loading } = useProjectCapacityListQuery({
    variables: {
      pk: hostId as string,
      filter: { dateRange: { start, end } },
    },
  });

  if (!data && loading) return <LoadingIndicator />;

  const markedDays = data?.projectCapacityList?.map(item => ({
    titleStyle: { color: "#333" },
    containerStyle: { width: 45, borderRadius: 0 },
    buttonStyle: { backgroundColor: "#DADADA", borderRadius: 0 },
    date: moment(item?.date as string)
      .locale("en")
      .format("YYYY-MM-DD"),
  }));

  const daysData = data?.projectCapacityList?.map(item => {
    return {
      date: item?.date,
      data: item?.freeCapacity,
    };
  });

  return (
    <Container>
      <WhiteSpace size={24} />

      <Text bold heading2>
        {tr("calendar management")}
      </Text>
      <WhiteSpace size={24} />
      <JalaliDatePicker markedDays={markedDays} daysData={daysData} />
    </Container>
  );
};

export default calendarManagementScreen;
