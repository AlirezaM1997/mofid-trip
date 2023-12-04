import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, BottomSheet, Button, Divider, ListItem, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  useNgoDetailQuery,
  TourTransactionQueryType,
  useMyNgoDetailQuery,
  MyNgoDetailQuery,
} from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useLocalSearchParams, useNavigation } from "expo-router";
import RequestList from "@modules/tour-request-card/RequestList";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import ButtonRow from "@modules/button-rows";
import WhiteSpace from "@atoms/white-space";
import { HEIGHT } from "@src/constants";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const { tourId, tourName } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  navigation.setOptions({ title: tourName });

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  const [transactionSet, setTransactionSet] =
    useState<MyNgoDetailQuery["NGODetail"]["tourTransactionSet"]>();

  const { loading, data } = useMyNgoDetailQuery();

  useEffect(() => {
    if (!loading && data) {
      setTransactionSet(
        data.NGODetail.tourTransactionSet.filter(tr => tr.tourPackage.tour.id === tourId)
      );
    }
  }, [loading, data]);

  if (loading || !transactionSet) return <LoadingIndicator />;

  if (!transactionSet.length) return <NoResult />;

  return (
    <Container style={style.container}>
      <View style={style.header}>
        <Text heading2>
          {true ? tr("requests and passengers") : tr("requests received for tours")}
        </Text>
        <Text caption type="grey2">
          {true
            ? tr(
                "passengers who plan to travel with this tour. please check the submitted requests."
              )
            : tr("all requests received from travelers who plan to travel with your tours")}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{}}>
        {transactionSet.map((transaction: TourTransactionQueryType, i) => (
          <>
            <ListItem bottomDivider onPress={handleOpen}>
              <Avatar rounded source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }} />
              <ListItem.Content>
                <ListItem.Title>John Doe</ListItem.Title>
                <ListItem.Subtitle>President</ListItem.Subtitle>
              </ListItem.Content>
              <Text caption>{tr("More details")}</Text>
            </ListItem>
            <ListItem bottomDivider onPress={handleOpen}>
              <Avatar
                rounded
                icon={{
                  name: "person-outline",
                  type: "material",
                  size: 26,
                }}
                containerStyle={{ backgroundColor: "#c2c2c2" }}
              />
              <ListItem.Content>
                <ListItem.Title>Alba King</ListItem.Title>
                <ListItem.Subtitle>Vice President</ListItem.Subtitle>
              </ListItem.Content>
              <Text caption>{tr("More details")}</Text>
            </ListItem>
            <ListItem onPress={handleOpen}>
              <Avatar rounded title="A" containerStyle={{ backgroundColor: "grey" }} />
              <ListItem.Content>
                <ListItem.Title>Adam Eva</ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
              <Text caption>{tr("More details")}</Text>
            </ListItem>

            <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
              <View style={{ height: HEIGHT - 100 }}>
                <View>
                  <WhiteSpace size={20} />
                  <Avatar
                    rounded
                    source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                  />
                  <Text>asdasd</Text>
                  <Text type="grey2">asdasd</Text>
                  <Text type="grey2">asdsa</Text>
                  <WhiteSpace />
                </View>
                <Divider thickness={8} />

                <ScrollView contentContainerStyle={{ flex: 1 }}>
                  {[1, 2, 3, 4].map(i => (
                    <>
                      <ListItem bottomDivider>
                        <Avatar
                          rounded
                          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                        />
                        <ListItem.Content>
                          <ListItem.Title>John Doe</ListItem.Title>
                          <ListItem.Subtitle>President</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                      <ListItem bottomDivider>
                        <Avatar
                          rounded
                          icon={{
                            name: "person-outline",
                            type: "material",
                            size: 26,
                          }}
                          containerStyle={{ backgroundColor: "#c2c2c2" }}
                        />
                        <ListItem.Content>
                          <ListItem.Title>Alba King</ListItem.Title>
                          <ListItem.Subtitle>Vice President</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                      <ListItem>
                        <Avatar rounded title="A" containerStyle={{ backgroundColor: "grey" }} />
                        <ListItem.Content>
                          <ListItem.Title>Adam Eva</ListItem.Title>
                          <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </>
                  ))}
                </ScrollView>

                <Container>
                  <WhiteSpace />
                  <ButtonRow>
                    <Button>تائید درخواست</Button>
                    <Button>رد درخواست</Button>
                  </ButtonRow>
                </Container>
              </View>
            </BottomSheet>

            {/* <RequestList
              key={transaction.owner.id}
              transaction={transaction}
              tourName={transaction.tourPackage.title}
            /> */}
            {/* {transactionSet.length > i + 1 && <Divider />} */}
          </>
        ))}
      </ScrollView>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 24,
    gap: 30,
  },
  header: {
    gap: 4,
  },
});

export default RequestScreen;
