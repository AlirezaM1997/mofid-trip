import React from "react";
import Map from "@modules/map";
import { TransactionStatusEnum } from "@src/gql/generated";
import { Divider, Text } from "@rneui/themed";
import Container from "@atoms/container";
import { Linking, Platform, Pressable, View } from "react-native";
import ContactCard from "@modules/contact-card";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@atoms/white-space";

const PaymentStep = ({ status, location, creator }) => {
  const { tr } = useTranslation();

  const openMapHandler = () => {
    const scheme = Platform?.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
    const latLng = ` ${location.lat}, ${location.lng}`;
    const url = Platform?.select({
      ios: `${scheme}@${latLng}`,
      android: `${scheme}${latLng}`,
    });

    if (Platform.OS === "web") {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      window.open(googleMapsUrl, "_blank");
      return;
    }

    Linking?.openURL(url);
  };

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

          <Pressable onPress={openMapHandler}>
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
