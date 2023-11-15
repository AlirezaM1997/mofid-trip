import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Badge, BottomSheet, Button, ButtonGroup, Card, Text, useTheme } from "@rneui/themed";
import {
  AccommodationQueryType,
  MyNgoDetailQuery,
  TourTourStatusStepChoices,
} from "@src/gql/generated";
import useMyNGOTable from "@src/hooks/db/ngo";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { getTourRequestStatusBadgeColor } from "@src/helper/tour";
import { useState } from "react";
import ComingSoon from "@modules/coming-soon";

const TourManagement = () => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
            {(tour.destination as AccommodationQueryType)?.province ?? tr("Province")},
            {(tour.destination as AccommodationQueryType)?.city ?? tr("City")}
          </Card.FeaturedTitle>
          <Card.FeaturedSubtitle numberOfLines={2} type="grey3">
            {tour.description}
          </Card.FeaturedSubtitle>
          <Container size={10} style={styles.footer}>
            <View style={styles.buttonContainer}>
              <Button type="outline" color="secondary" size="sm" onPress={() => setIsVisible(true)}>
                <Feather name="trash" size={12} color={theme.colors.secondary} />
              </Button>
              <Button type="outline" color="secondary" size="sm" onPress={() => setIsVisible(true)}>
                <Feather name="edit" size={12} color={theme.colors.secondary} />
              </Button>
            </View>
            <Badge
              value={tour.statusStep}
              color={getTourRequestStatusBadgeColor(tour)}
              type="outline"
            />
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
