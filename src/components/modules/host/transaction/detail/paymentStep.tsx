import React from "react";
import Map from "@modules/map";
import { TransactionStatusEnum } from "@src/gql/generated";
import { Divider, Text } from "@rneui/themed";
import Container from "@atoms/container";
import { Linking, Platform, Pressable, View } from "react-native";
import ContactCard from "@modules/contact-card";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@atoms/white-space";
import openMapHandler from "@src/helper/opem-map";

const PaymentStep = ({ status, location, creator }) => {
  const { tr } = useTranslation();

  return (
    <>
      {[TransactionStatusEnum.Payment, TransactionStatusEnum.Successful].includes(status.step) && (
        <>
          <Divider bgColor="grey0" thickness={6} />

          <Container>
            <View>
              <Text>{tr("communication with the host")}</Text>
              <WhiteSpace size={6} />
              <Text caption type="grey2">
                {tr("you can communicate with the host owner by calling and texting.")}
              </Text>
            </View>
            <WhiteSpace size={16} />
            <ContactCard user={creator ?? {}} />
          </Container>

          <Divider bgColor="grey0" thickness={6} />

          <Pressable onPress={() => openMapHandler(location.lat, location.lng)}>
            <Container>
              <Map lat={location.lat} lng={location.lng} />
            </Container>
          </Pressable>
        </>
      )}
    </>
  );
};

export default PaymentStep;
