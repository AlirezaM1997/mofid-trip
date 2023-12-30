import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import ComingSoon from "@modules/coming-soon";
import { BottomSheet, Button, Card, Chip, Text, useTheme } from "@rneui/themed";
import {
  AccommodationQueryType,
  TourStatusEnum,
  useMyNgoDetailTourSetQuery,
} from "@src/gql/generated";
import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getTourRequestStatusBadgeColor } from "@src/helper/tour";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingIndicator from "@modules/Loading-indicator";

const TourManagement = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [tourSet, setTourSet] = useState([]);
  const { loading, data } = useMyNgoDetailTourSetQuery();

  const navigateToTourDetail = (tourId: string) => {
    router.push(`/tour/management/${tourId}`);
  };

  useEffect(() => {
    if (!loading && data) {
      setTourSet(data.NGODetail.tourSet);
    }
  }, [loading, data]);

  if (loading) return <LoadingIndicator />;

  return (
    <View>
      {tourSet.map(tour => (
        <Pressable onPress={() => navigateToTourDetail(tour.id)}>
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
              {tour.statusStep === TourStatusEnum.Request ? (
                <Chip
                  title={tour.statusStep}
                  color={getTourRequestStatusBadgeColor(tour)}
                  type="outline"
                />
              ) : (
                <>
                  <Text type={getTourRequestStatusBadgeColor(tour)}>
                      {tr("view and manage tour")}
                  </Text>
                  <Feather size={20} name={"chevron-left"} color={theme.colors.primary} />
                </>
              )}
            </Container>
            <WhiteSpace size={10} />
          </Card>
        </Pressable>
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
