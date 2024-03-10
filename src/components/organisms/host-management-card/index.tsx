import { router } from "expo-router";
import Container from "@atoms/container";
import { useDispatch } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import { ProjectQueryType } from "@src/gql/generated";
import { Card, Chip, Text, useTheme } from "@rneui/themed";
import { getHostRequestStatusBadgeColor } from "@src/helper/host";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";

const HostManagementCard = ({ host }: { host: ProjectQueryType }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const navigateToHostDetail = () => {
    dispatch(
      setRedirectToScreenAfterLogin({
        pathname: "/host/management",
      })
    );
    router.push(`/host/management/${host.id}`);
  };

  return (
    <Pressable onPress={navigateToHostDetail}>
      <Card key={host.id}>
        <Card.Image
          source={
            (host?.accommodation?.avatarS3?.length as number) > 0
              ? {
                  uri: host?.accommodation?.avatarS3?.[0]?.orginal,
                }
              : require("@assets/image/defaultHost.svg")
          }
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
          {host.statusStep?.name === "REQUEST" ? (
            <Chip
              title={host?.statusStep.displayName as string}
              color={getHostRequestStatusBadgeColor(host)}
              type="outline"
            />
          ) : (
            <>
              <Text type={getHostRequestStatusBadgeColor(host)}>{tr("view and manage host")}</Text>
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HostManagementCard;
