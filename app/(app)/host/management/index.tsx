import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import ComingSoon from "@modules/coming-soon";
import { BottomSheet, Button, Card, Chip, useTheme } from "@rneui/themed";
import {  MyNgoDetailProjectSetQuery, useMyNgoDetailProjectSetQuery } from "@src/gql/generated";
import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getHostRequestStatusBadgeColor } from "@src/helper/host";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import NoResult from "@organisms/no-result";
import { HEIGHT } from "@src/constants";

const HostManagementScreen = () => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hostSet, setHostSet] = useState<MyNgoDetailProjectSetQuery["NGODetail"]["projectSet"]>([]);
  const { loading, data } = useMyNgoDetailProjectSetQuery({fetchPolicy: "network-only",});
  const { theme } = useTheme();

  const navigateToTourDetail = (host: (typeof hostSet)[0]) =>
    router.push({
      pathname: `/host/management/${host.id}`,
    });

  useEffect(() => {
    if (!loading && data) {
      setHostSet(data.NGODetail.projectSet);
    }
  }, [loading, data]);

  if (loading) return <LoadingIndicator />;

  return (
    <ScrollView>
      {!hostSet?.length && (
        <View style={{ height: HEIGHT / 2 }}>
          <NoResult />
        </View>
      )}
      {hostSet?.map(host => (
        <Card key={host.id}>
          <Pressable onPress={() => navigateToTourDetail(host)}>
            <Card.Image
              source={{
                uri: host?.accommodation?.avatarS3?.[0]?.medium,
              }}
            />
            <WhiteSpace size={10} />
            <Card.Title heading1 bold caption>
              {host?.name}
            </Card.Title>
            <Card.FeaturedTitle caption>
              {host?.accommodation?.province ?? tr("Province")},{" "}
              {host?.accommodation?.city ?? tr("City")}
            </Card.FeaturedTitle>
            <Card.FeaturedSubtitle numberOfLines={2} type="grey3">
              {host?.description}
            </Card.FeaturedSubtitle>
          </Pressable>
          <Container size={10} style={styles.footer}>
            <View style={styles.buttonContainer}>
              <Button type="outline" color="secondary" size="sm" onPress={() => setIsVisible(true)}>
                <Feather name="trash" size={12} color={theme.colors.secondary} />
              </Button>
              <Button type="outline" color="secondary" size="sm" onPress={() => setIsVisible(true)}>
                <Feather name="edit" size={12} color={theme.colors.secondary} />
              </Button>
            </View>
            {/* <Chip
              title={host?.statusStep}
              color={getHostRequestStatusBadgeColor(host)}
              type="outline"
            /> */}
          </Container>
          <WhiteSpace size={10} />
        </Card>
      ))}
      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Container>
          <WhiteSpace size={10} />
          <ComingSoon />
          <WhiteSpace size={10} />
          <Button size="sm" type="outline" color="secondary" onPress={() => setIsVisible(false)}>
            {tr("ok")}
          </Button>
        </Container>
      </BottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  footer: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});

export default HostManagementScreen;
