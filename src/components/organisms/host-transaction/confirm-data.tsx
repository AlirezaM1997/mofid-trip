import React from "react";
import moment from "jalali-moment";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ProjectTransactionAddInputType } from "@src/gql/generated";

const HostTransactionConfirmData = ({ setActiveStep }) => {
  const { tr } = useTranslation();
  const { projectId, name } = useLocalSearchParams();

  const handleNavigation = () => {
    router.push({ pathname: `host/${projectId}`, params: { projectId: projectId, name: name } });
  };

  const { values } = useFormikContext<ProjectTransactionAddInputType>();

  return (
    <View style={styles.container}>
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
          onPress={handleNavigation}
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
          <Text body2>
            {values?.dateStart &&
              moment(values?.dateStart)?.locale("fa")?.format("dddd . jDD jMMMM YYYY")}
          </Text>
        </View>
        <Button
          size="sm"
          type="outline"
          color="secondary"
          iconPosition="right"
          titleStyle={styles.buttonTitle}
          onPress={() => setActiveStep(activeStep => activeStep - 1)}
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
            {values.guests.guestNumber}&nbsp;{tr("person")}
          </Text>
        </View>
        <Button
          size="sm"
          type="outline"
          color="secondary"
          iconPosition="right"
          titleStyle={styles.buttonTitle}
          onPress={() => setActiveStep(activeStep => activeStep - 2)}
          icon={<AntDesign name="left" size={16} color="black" />}>
          {tr("edit")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: { flex: 1 },
  buttonTitle: { padding: 8 },
  container: { gap: 24, marginTop: 32 },
  cardContainer: { flexDirection: "row", gap: 16, alignItems: "center" },
});

export default HostTransactionConfirmData;
