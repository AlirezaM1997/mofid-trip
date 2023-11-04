import Container from "@atoms/container";
import Text from "@atoms/text";
import WhiteSpace from "@atoms/white-space";
import PlaceCard from "@modules/place-card";
import { Avatar, Image, useTheme } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import { useNgoDetailQuery } from "@src/gql/generated";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const height = 220;

export default () => {
  const { theme } = useTheme();
  const { ngoId } = useLocalSearchParams();
  const { loading, data } = useNgoDetailQuery({ variables: { pk: ngoId as string } });

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: "https://visitiran.ir/visitPic/de2e_standard/public/2019-01/DSCF3742.jpg",
        }}
      />
      <Avatar
        size={80}
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        containerStyle={styles.avatarContainerStyle(theme)}
      />

      <WhiteSpace size={50} />
      <Container>
        <Text variant="heading2">Park elmo fanavari pardis</Text>
        <Text>Park elmo fanavari pardis</Text>
        <WhiteSpace size={10} />
        <Text>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
          demonstrate the visual form of a document or a typeface without relying on meaningful
          content. Lorem ipsum may be used as a placeholder before final copy is available.
          Wikipedia
        </Text>
      </Container>

      <WhiteSpace size={20} />
      <Container>
        <Text variant="heading2">Hostings</Text>
        <WhiteSpace size={10} />
        <View style={styles.row}>
          {data?.NGODetail?.projectSet?.map(p => (
            <>
              <PlaceCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                avatarS3={p.accommodation.avatarS3}
                address={p.accommodation[0].address}
              />
              <PlaceCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                avatarS3={p.accommodation.avatarS3}
                address={p.accommodation[0].address}
              />
            </>
          ))}
        </View>
        {!data?.NGODetail?.projectSet?.length && <Text>No project</Text>}
      </Container>
      <WhiteSpace size={40} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: { width: WIDTH, height: height },
  avatarContainerStyle: theme => ({
    position: "absolute",
    top: height - 40,
    left: 20,
    borderWidth: 3,
    borderColor: theme.colors.white,
  }),
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
