import { Badge, Button, Card, Text } from "@rneui/themed";
import useNGODTable from "@src/hooks/db/ngo";

const TourManagement = () => {
  const { get } = useNGODTable();
  const tourDetail = get();

  return (
    <Card>
      <Card.Image
        source={{
          uri: "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg",
        }}
      />
        <Card.Title heading1 bold caption>
          تور ماسوله و مرداب سراوان
        </Card.Title>
      <Card.FeaturedTitle>ماسوله، ایران، گیلان</Card.FeaturedTitle>
      <Card.FeaturedSubtitle>aAAAAAAAAAAaa</Card.FeaturedSubtitle>
      <Card.Divider />
        <Text>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Badge value="در حال بررسی توسط مفیدتریپ" />
    </Card>
  );
};

export default TourManagement;
