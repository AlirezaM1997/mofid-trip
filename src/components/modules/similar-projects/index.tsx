import { router } from "expo-router";
import WhiteSpace from "@atoms/white-space";
import { EvilIcons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Image, Text, useTheme } from "@rneui/themed";
import { ProjectQueryType } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import { Pressable, ScrollView, StyleSheet, View, Platform } from "react-native";

type PropsType = {
  projects: ProjectQueryType[];
  currentProjectId: string;
};

type ItemPropsType = {
  project: ProjectQueryType;
};

const Item = ({ project }: ItemPropsType) => {
  const { formatPrice } = useFormatPrice();
  const { tr } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={style.card}>
      <Image
        style={style.imageStyle}
        source={
          (project?.accommodation?.avatarS3?.length as number) > 0
            ? {
                uri: project?.accommodation?.avatarS3?.[0]?.large,
              }
            : require("@assets/image/defaultHost.svg")
        }
      />
      <View style={style.cardTextContainer}>
        <Text numberOfLines={1} body2 bold>
          {project.name}
        </Text>
        <View style={style.address}>
          <EvilIcons name="location" size={16} color={theme.colors.grey3} />
          <Text numberOfLines={1} type="grey3" caption>
            {project?.accommodation?.address}
          </Text>
        </View>
        {(project?.price as number) <= 0 ? (
          <Text body2 bold>
            {tr("it is free")}
          </Text>
        ) : (
          <Text body2 bold>
            {formatPrice(project?.price as number)} / هر‌شب
          </Text>
        )}
      </View>
    </View>
  );
};

const SimilarProjects = ({ projects, currentProjectId }: PropsType) => {
  const handlePress = (project: ProjectQueryType) =>
    router.push({ pathname: `/host/${project.id}`, params: { name: project.name } });

  return (
    <>
      <ScrollView horizontal contentContainerStyle={style.contentContainerStyle}>
        <View style={style.dummyContent} />
        {projects
          ?.filter(p => p.id !== currentProjectId)
          .map((p, index) => (
            <Pressable key={index} onPress={() => handlePress(p)}>
              <Item project={p} />
            </Pressable>
          ))}
        <View style={style.dummyContent} />
      </ScrollView>
      {projects.length > 1 && <WhiteSpace size={32} />}
    </>
  );
};

const style = StyleSheet.create({
  contentContainerStyle: { gap: 15, paddingVertical: 15 },
  dummyContent: { width: 10 },
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    height: 100,
    width: 300,
    borderRadius: 10,
    elevation: 1,
    padding: 8,
    gap: 10,
    flexDirection: "row",
    ...Platform.select({
      web: { boxShadow: "0 0 3px #12121233" },
    }),
  },
  imageStyle: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },
  cardTextContainer: {
    width: 185,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  address: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});

export default SimilarProjects;
