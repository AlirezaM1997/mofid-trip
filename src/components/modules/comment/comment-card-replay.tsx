import {
  LikeObjectEnum,
  LikeStatusEnum,
  TourQueryType,
  useLikeAddMutation,
} from "@src/gql/generated";
import moment from "jalali-moment";
import React, { useState } from "react";
import Container from "@atoms/container";
import { AntDesign } from "@expo/vector-icons";
import { Divider, Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const CommentCardReplay = ({
  comment,
  refetch,
  index,
}: {
  comment: TourQueryType["commentSet"][0];
  refetch;
  index;
}) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [showText, setShowText] = useState<boolean>(false);

  const handleShowText = () => setShowText(!showText);
  const [likeAdd] = useLikeAddMutation();

  const handleLike = async () => {
    const { data } = await likeAdd({
      variables: {
        data: {
          objectType: LikeObjectEnum.Comment,
          objectId: +comment.id,
          status: LikeStatusEnum.Like,
        },
      },
    });
    if (data?.likeAdd?.status === "OK") {
      refetch();
    }
  };
  const handleDislike = async () => {
    const { data } = await likeAdd({
      variables: {
        data: {
          objectType: LikeObjectEnum.Comment,
          objectId: +comment.id,
          status: LikeStatusEnum.Dislike,
        },
      },
    });
    if (data?.likeAdd?.status === "OK") {
      refetch();
    }
  };

  return (
    <>
      <Container style={styles.containerStyle}>
        <View style={styles.cardInf}>
          <Text caption type="grey3">
            {tr("replay")} {localizeNumber(index + 1)}
          </Text>
          <View style={styles.commentText}>
            <Pressable onPress={handleShowText}>
              <Text caption numberOfLines={(!showText && 4) as number}>
                {comment.text}
              </Text>
            </Pressable>
            <Text caption type="grey3">
              {localizeNumber(moment(comment.createdDate).locale("fa").format("jD jMMMM jYYYY"))} .{" "}
              {comment.user.fullname}
            </Text>
          </View>
        </View>
        <View style={styles.likeInf(theme)}>
          <Text caption type="grey2">
            {tr("was this review helpful?")}
          </Text>
          <View style={styles.likeBox}>
            <View style={styles.likeStyle}>
              <Text caption type="grey2">
                {localizeNumber(comment.likeCount)}
              </Text>
              <AntDesign name="like2" size={16} color={theme.colors.grey2} onPress={handleLike} />
            </View>
            <View style={styles.likeStyle}>
              <Text caption type="grey2">
                {localizeNumber(comment.dislikeCount)}
              </Text>
              <AntDesign
                name="dislike2"
                size={16}
                color={theme.colors.grey2}
                onPress={handleDislike}
              />
            </View>
          </View>
        </View>
      </Container>
      <Divider width={6} />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: { gap: 16 },
  cardInf: { flexDirection: "row", gap: 16 },
  commentText: { gap: 4, width: "80%" },
  likeInf: theme => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: theme.colors.grey0,
  }),
  likeBox: { flexDirection: "row", gap: 16, alignItems: "center" },
  likeStyle: { flexDirection: "row", gap: 4, alignItems: "center" },
});

export default CommentCardReplay;
