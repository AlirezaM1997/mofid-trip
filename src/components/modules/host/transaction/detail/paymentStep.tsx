import React from "react";
import Map from "@modules/map/index.web";
import { Divider, Text } from "@rneui/themed";
import Container from "@atoms/container";
import { Pressable, View } from "react-native";
import ContactCard from "@modules/contact-card";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@atoms/white-space";
import openMapHandler from "@src/helper/opem-map";

const PaymentStep = ({ status, location, creator }) => {
  const { tr } = useTranslation();

  return (
    <>
      {["PAYMENT", "SUCCESSFUL"].includes(status.step.name) && (
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
            <Map
                lat={location.lat}
                lng={location.lng}
                zoom={12}
                mapOptions={{
                  dragging: false,
                  zoomControl: false
                }}
                mapMarkers={[
                  {
                    id: "string",
                    position: { lat: location.lat , lng: location.lng },
                    size: [52, 60],
                    icon: window.location.origin + "/assets/assets/image/marker.png",
                    iconAnchor: [-17, 30],
                  },
                ]}
              />
            </Container>
          </Pressable>
        </>
      )}
    </>
  );
};

export default PaymentStep;
