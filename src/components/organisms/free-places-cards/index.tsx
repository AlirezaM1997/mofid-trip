import { ProjectQueryType, ProjectTagEnum } from "@src/gql/generated";
import { View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Text from "@src/components/atoms/text";
import PlaceCard from "@src/components/modules/place-card";
import { useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { PRIMARY_COLOR } from "@src/theme";
import { useDispatch, useSelector } from "react-redux";
import { setProjectSetArguments } from "@src/slice/project-slice";
import { RootState } from "@src/store";
import useTranslation from "@src/hooks/translation";
import { useRouter } from "expo-router";
import useProjectTable from "@src/hooks/db/project";

function FreePlacesCards() {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice);
  const [list, setList] = useState<ProjectQueryType[]>();

  const { search } = useProjectTable();

  const handleSeeAll = () => {
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          tags: [ProjectTagEnum.Free],
        },
      })
    );
    router.push("/search");
  };

  useEffect(() => {
    const res = search({ filter: { tags: [ProjectTagEnum.Free] } });
    setList(res);
  }, []);

  return (
    <>
      <View style={style.container}>
        <View style={style.mainTitle}>
          <Text variant="heading1" color={theme.colors.white}>
            {tr("Absolutely Free Offers")}
          </Text>
          <Pressable onPress={handleSeeAll}>
            <Text variant="body2" color={theme.colors.white}>
              {tr("See All")}
            </Text>
          </Pressable>
        </View>
        <Text variant="body1" color={theme.colors.white} style={style.subtitle}>
          {tr("Our free offers in different cities of the world")}
        </Text>
      </View>
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }} style={style.container}>
        <View style={style.cardsContainer}>
          <View style={style.freeSpace}></View>
          {list?.map((project, index) => (
            <View key={index}>
              <PlaceCard key={index} project={project} />
            </View>
          ))}
          <View style={style.freeSpace}></View>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: { backgroundColor: PRIMARY_COLOR },
  mainTitle: {
    marginLeft: 24,
    paddingTop: 24,
    marginRight: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtitle: { marginBottom: 4, marginLeft: 24 },
  cardsContainer: {
    gap: 10,
    marginTop: 16,
    display: "flex",
    marginBottom: 24,
    paddingBottom: 10,
    flexDirection: "row",
  },
  freeSpace: {
    backgroundColor: "transparent",
    width: 15,
    height: 15,
  },
});

export default FreePlacesCards;
