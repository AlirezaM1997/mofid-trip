import Container from "@atoms/container";
import { Text } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import { Avatar, Image, useTheme } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import { useNgoDetailQuery } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HostCard from "@modules/host/card";
import { useEffect } from "react";
import LoadingIndicator from "@modules/Loading-indicator";

const height = 220;

export default () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { ngoId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { loading, data } = useNgoDetailQuery({ variables: { pk: ngoId as string } });

  useEffect(() => {
    if (!loading && data) {
      navigation.setOptions({
        title: data.NGODetail.title,
      });
    }
  }, [loading, data]);

  if (loading) return <LoadingIndicator />;

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: "https://visitiran.ir/visitPic/de2e_standard/public/2019-01/DSCF3742.jpg",
        }}
      />
      {data.NGODetail.user.avatarS3?.small ? (
        <Avatar
          size={80}
          rounded
          source={{ uri: data.NGODetail.user.avatarS3.small }}
          containerStyle={styles.avatarContainerStyle(theme)}
        />
      ) : (
        <Avatar
          rounded
          size={80}
          icon={{
            name: "user",
            type: "feather",
            size: 40,
          }}
          containerStyle={[
            styles.avatarContainerStyle(theme),
            { backgroundColor: theme.colors.grey2 },
          ]}
        />
      )}

      <WhiteSpace size={50} />
      <Container>
        <Text heading2 bold>
          {data.NGODetail.title}
        </Text>
        <Text caption>{data.NGODetail.address}</Text>
        <WhiteSpace size={10} />
        <Text>{data.NGODetail.description}</Text>
      </Container>

      <WhiteSpace size={20} />
      <Container>
        <Text heading2>{tr("Other Hosts")}</Text>
        <WhiteSpace size={10} />
        <View style={styles.row}>
          {data?.NGODetail?.projectSet?.map(p => (
            <HostCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              avatarS3={p.accommodation.avatarS3}
              address={p.accommodation[0]?.address}
            />
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
