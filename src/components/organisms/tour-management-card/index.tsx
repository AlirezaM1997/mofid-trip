import { router } from "expo-router";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import { AccommodationQueryType } from "@src/gql/generated";
import { Card, Chip, Text, useTheme } from "@rneui/themed";

const TourManagementCard = ({ tour }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const navigateToTourDetail = () => router.push(`/tour/management/${tour.id}`);

  return (
    <Pressable onPress={navigateToTourDetail}>
      <Card key={tour.id}>
        <Card.Image
          source={{
            uri: tour.avatarS3?.[0]?.medium,
          }}
        />
        <WhiteSpace size={10} />
        <Card.Title heading1 bold caption>
          {tour.title}
        </Card.Title>
        <Card.FeaturedTitle caption>
          {(tour.destination as AccommodationQueryType)?.province ?? tr("Province")},{" "}
          {(tour.destination as AccommodationQueryType)?.city ?? tr("City")}
        </Card.FeaturedTitle>
        <Card.FeaturedSubtitle numberOfLines={2} type="grey3">
          {tour.description}
        </Card.FeaturedSubtitle>
        <Container size={10} style={styles.footer}>
          {tour.statusStep.name === "REQUEST" ? (
            <Chip title={tour.statusStep.displayName} color="warning" type="outline" />
          ) : (
            <>
              <Text type="primary">{tr("view and manage tour")}</Text>
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

export default TourManagementCard;
