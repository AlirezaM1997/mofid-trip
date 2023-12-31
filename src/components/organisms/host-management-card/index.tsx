import { router } from "expo-router";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import { ProjectStatusEnum } from "@src/gql/generated";
import { Card, Chip, Text, useTheme } from "@rneui/themed";
import { getHostRequestStatusBadgeColor } from "@src/helper/host";

const HostManagementCard = ({ host }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const navigateToTourDetail = host =>
    router.push({
      pathname: `/host/management/${host.id}`,
    });

  return (
    <Pressable onPress={() => navigateToTourDetail(host)}>
      <Card key={host.id}>
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
        <Container size={10} style={styles.footer}>
          {host.statusStep === ProjectStatusEnum.Request ? (
            <Chip
              title={host?.statusStep}
              color={getHostRequestStatusBadgeColor(host)}
              type="outline"
            />
          ) : (
            <>
              <Text type={getHostRequestStatusBadgeColor(host)}>
                  {tr("view and manage host")}
              </Text>
              <Feather size={20} name={"chevron-left"} color={theme.colors.primary} />
            </>
          )}
        </Container>
        <WhiteSpace size={10} />
      </Card>
    </Pressable>
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

export default HostManagementCard;
