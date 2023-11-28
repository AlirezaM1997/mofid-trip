import React from "react";
import moment from "jalali-moment";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import HostTransactionBottomSheet from "@modules/host-transaction-bottom-sheet";

const confirmDataScreen = () => {
  const { tr } = useTranslation();
  const { projectId, name } = useLocalSearchParams();
  const { data } = useSelector((state: RootState) => state.hostTransactionSlice);

  const handleNavigation = (route: string) => {
    router.push({ pathname: route, params: { projectId, name } });
  };

  return (
    <HostTransactionBottomSheet>
      <Container style={styles.container}>
        <View>
          <Text heading2>{tr("final information")}</Text>
          <WhiteSpace size={4} />
          <Text caption type="grey2">
            {tr("your registered details for initial host reservation")}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <AntDesign name="home" size={15} color="black" />
          <View style={styles.detail}>
            <Text caption type="grey2">
              {tr("selective hosting")}
            </Text>
            <Text body2>{name}</Text>
          </View>
          <Button
            size="sm"
            type="outline"
            color="secondary"
            iconPosition="right"
            titleStyle={styles.buttonTitle}
            onPress={() => handleNavigation(`project/${projectId}`)}
            icon={<AntDesign name="left" size={16} color="black" />}>
            {tr("view")}
          </Button>
        </View>

        <View style={styles.cardContainer}>
          <AntDesign name="calendar" size={15} color="black" />
          <View style={styles.detail}>
            <Text caption type="grey2">
              {tr("travel date")}
            </Text>
            <Text body2>{moment(data.startTime).locale("fa").format("dddd . jDD jMMMM YYYY")}</Text>
          </View>
          <Button
            size="sm"
            type="outline"
            color="secondary"
            iconPosition="right"
            titleStyle={styles.buttonTitle}
            onPress={() => handleNavigation("host/create/date")}
            icon={<AntDesign name="left" size={16} color="black" />}>
            {tr("edit")}
          </Button>
        </View>

        <View style={styles.cardContainer}>
          <Ionicons name="people-outline" size={15} color="black" />
          <View style={styles.detail}>
            <Text caption type="grey2">
              {tr("passengers count")}
            </Text>
            <Text body2>
              {data.capacity.capacityNumber}&nbsp;{tr("person")}
            </Text>
          </View>
          <Button
            size="sm"
            type="outline"
            color="secondary"
            iconPosition="right"
            titleStyle={styles.buttonTitle}
            onPress={() => handleNavigation("host/create/capacity")}
            icon={<AntDesign name="left" size={16} color="black" />}>
            {tr("edit")}
          </Button>
        </View>
      </Container>
    </HostTransactionBottomSheet>
  );
};

const styles = StyleSheet.create({
  detail: { flex: 1 },
  buttonTitle: { padding: 8 },
  container: { gap: 24, marginTop: 32 },
  cardContainer: { flexDirection: "row", gap: 16, alignItems: "center" },
});

export default confirmDataScreen;
