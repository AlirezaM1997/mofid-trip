import { Text } from "@rneui/themed";
import useNGODTable from "@src/hooks/db/ngo";
import { useEffect } from "react";

const TourManagement = () => {
  const { get } = useNGODTable();
  const tourDetail = get()

  return <Text>asd</Text>;
};

export default TourManagement;
