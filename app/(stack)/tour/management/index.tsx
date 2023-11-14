import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Badge, Button, Card, Text, useTheme } from "@rneui/themed";
import { AccommodationQueryType } from "@src/gql/generated";
import useMyNGOTable from "@src/hooks/db/ngo";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const TourManagement = () => {
  const { get } = useMyNGOTable();
  const { theme } = useTheme();

  const { tourSet } = get();

  return (
    <View>
      {tourSet.map(tour => (
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
            {(tour.destination as AccommodationQueryType).province},{" "}
            {(tour.destination as AccommodationQueryType).city}
          </Card.FeaturedTitle>
          <Card.FeaturedSubtitle numberOfLines={2} type="grey3">
            {tour.description}
          </Card.FeaturedSubtitle>
          <Container size={10} style={styles.footer}>
            <View style={styles.buttonContainer}>
              <Button type="outline" color="secondary" size="sm">
                <Feather name="trash" size={12} color={theme.colors.secondary} />
              </Button>
              <Button type="outline" color="secondary" size="sm">
                <Feather name="edit" size={12} color={theme.colors.secondary} />
              </Button>
            </View>
            <Badge value={tour.statusStep} color="warning" type="outline" />
          </Container>
          <WhiteSpace size={10} />
        </Card>
      ))}
    </View>
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

export default TourManagement;
