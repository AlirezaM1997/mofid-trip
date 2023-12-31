import React from "react";
import { Text } from "@rneui/themed";
import { ProjectQueryType } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import { router } from "expo-router";
import { ImageBackground, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";

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

  return (
    <View style={style.card}>
      <ImageBackground
        style={style.imageContainerStyle}
        imageStyle={style.imageStyle}
        source={project?.accommodation?.avatarS3.length > 0 ? {
          uri: project?.accommodation?.avatarS3[0]?.large,
        }:
        require("@assets/image/defaultHost.png")}
      />
      <View style={style.cardTextContainer}>
        <Text numberOfLines={1} style={style.projectTitle} body1>
          {project.name}
        </Text>
        <Text numberOfLines={1} style={style.projectAddress} body2>
          {project.accommodation.address}
        </Text>
        <Text bold>{project.price <= 0 ? tr("it is free") : formatPrice(project.price)}</Text>
      </View>
    </View>
  );
};

const SimilarProjects = ({ projects, currentProjectId }: PropsType) => {
  const handlePress = (project: ProjectQueryType) =>
    router.push({ pathname: `/host/${project.id}`, params: { name: project.name } });

  return (
    <ScrollView horizontal style={style.container}>
      {projects
        ?.filter(p => p.id !== currentProjectId)
        .map((p, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(p)}
            style={{
              paddingVertical: 5,
              paddingLeft: index === 0 ? 0 : 10,
              paddingRight: index === projects.length - 1 ? 0 : 10,
            }}>
            <Item project={p} />
          </Pressable>
        ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 10,
    borderWidth: 0,
    elevation: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    paddingRight: 10,
    maxWidth: 300,
    ...Platform.select({
      web: { boxShadow: "0 0 3px #12121233" },
    }),
  },
  imageContainerStyle: { width: 100, height: 100 },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardTextContainer: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  projectTitle: {
    width: 180,
    height: "auto",
    overflow: "hidden",
  },
  projectAddress: {
    width: 180,
    height: "auto",
    overflow: "hidden",
  },
});

export default SimilarProjects;
