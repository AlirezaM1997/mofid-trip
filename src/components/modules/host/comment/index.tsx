import Container from "@atoms/container";
import { Button, Text } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProjectQueryType, useHostCommentQuery } from "@src/gql/generated";
import CommentCard from "@modules/comment/comment-card";
import { router, useLocalSearchParams } from "expo-router";
import AddCommentBottomSheet from "@modules/comment/add-comment-bottomsheet";

const HostComment = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { projectId, name } = useLocalSearchParams();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { loading, data, refetch } = useHostCommentQuery({
    variables: {
      pk: projectId as string,
    },
  });
  const handleNavigateToComment = () => router.push(`host/${projectId}/comment`);
  const handleOpen = () => setIsVisible(true);

  if (loading && !data) return null;

  const comment = data?.projectDetail?.commentSet;

  return (
    <>
      <Container style={styles.containerStyle}>
        <View style={styles.commentInf}>
          <Text subtitle1 bold>
            {tr("opinions about the host")}
          </Text>
          <Text body2>{localizeNumber(comment.length) + " " + tr("comment")}</Text>
        </View>
        <Pressable onPress={handleOpen} style={styles.commentAddStyle}>
          <View style={styles.commentAddBox}>
            <View style={styles.commentAddText}>
              <MaterialCommunityIcons name="comment-text-outline" size={12} />
              <Text body2>{tr("write your opinion about this host")}</Text>
            </View>
            <Feather name="chevron-left" size={12} />
          </View>
          <Text caption type="grey3">
            {tr(
              "write your comments and questions related to this host. once approved, your comment will be published."
            )}
          </Text>
        </Pressable>
        {comment.length === 0 ? (
          <View style={styles.noResultStyle}>
            <Feather style={styles.noResultIcon} name="alert-circle" size={16} />
            <Text body2>
              {tr("there are no comments yet. be the first to write your opinion about this host")}
            </Text>
          </View>
        ) : (
          (comment.length > 4 ? comment.slice(0, 4) : comment).map(comment => (
            <CommentCard
              comment={comment as ProjectQueryType["commentSet"][0]}
              key={comment.id}
              refetch={refetch}
              push={`host/${projectId}/comment`}
            />
          ))
        )}
        {comment.length > 0 && (
          <Button onPress={handleNavigateToComment} color="secondary">
            {tr("view more")}
          </Button>
        )}
      </Container>

      <AddCommentBottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        refetch={refetch}
        id={projectId.toString()}
        name={name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: { gap: 16 },
  commentInf: { flexDirection: "row", justifyContent: "space-between" },
  commentAddStyle: { gap: 4 },
  commentAddBox: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  commentAddText: { flexDirection: "row", gap: 8, alignItems: "center" },
  noResultStyle: { flexDirection: "row", gap: 4 },
  noResultIcon: { paddingTop: 10 },
});

export default HostComment;
