import { Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Text, useTheme } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import moment from "jalali-moment";
import { AntDesign, Entypo, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import {
  LikeObjectEnum,
  LikeStatusEnum,
  ProjectQueryType,
  TourQueryType,
  useLikeAddMutation,
} from "@src/gql/generated";
import { router } from "expo-router";
import ReportComment from "@modules/report/report-comment";
import { HEIGHT, WIDTH } from "@src/constants";

const CommentCard = ({
  comment,
  refetch,
  push,
}: {
  comment: TourQueryType["commentSet"][0] | ProjectQueryType["commentSet"][0];
  refetch;
  push;
}) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [likeAdd] = useLikeAddMutation();

  const handleOpen = () => setIsVisible(!isVisible);
  const handleClose = () => setIsVisible(false);

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

  const closeDropDown = () => window.addEventListener("click", handleClose);

  useEffect(() => {
    closeDropDown();
    return () => window.removeEventListener("click", handleClose);
  }, []);

  return (
    <View style={styles.containerStyle(theme)}>
      <View style={styles.cardInf}>
        <View style={styles.commentTextIcon}>
          <View style={styles.commentText}>
            <Text numberOfLines={4} caption>
              {comment.text}
            </Text>
          </View>
          <Entypo
            size={14}
            color={theme.colors.grey2}
            name="dots-three-vertical"
            onPress={handleOpen}
          />
          <View style={styles.backDrop(isVisible)}>
            <View style={styles.dropDown}>
              <ReportComment closeDropDown={handleClose} id={comment.id as string} />
            </View>
          </View>
        </View>
        <Text caption type="grey3">
          {localizeNumber(moment(comment.createdDate).locale("fa").format("jD jMMMM jYYYY"))} .{" "}
          {comment.user.fullname}
        </Text>
      </View>
      <View style={styles.footerCard}>
        <View style={styles.likeInf}>
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
            <View style={styles.likeStyle}>
              <Text caption type="grey2">
                {localizeNumber(comment.nestedComment.length)}
              </Text>
              <MaterialCommunityIcons
                onPress={() => router.push(push + `/${comment.id}`)}
                name="message-processing-outline"
                size={16}
                color={theme.colors.grey2}
              />
            </View>
          </View>
        </View>
        <Divider />
        <Button
          onPress={() => router.push(push + `/${comment.id}`)}
          buttonStyle={styles.buttonStyle}
          type="clear"
          size="sm"
          iconPosition="right"
          icon={<Feather name="chevron-left" size={16} color={theme.colors.primary} />}>
          {tr("record the answer")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backDrop: isVisible => ({
    display: isVisible ? "flex" : "none",
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    top: 25,
    left: -10,
  }),
  dropDown: {
    position: "absolute",
    left: 15,
    backgroundColor:'red',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121227" },
    }),
  },
  containerStyle: theme => ({
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: theme.colors.grey0,
    borderWidth: 1,
    gap: 16,
  }),
  cardInf: { gap: 4 },
  commentTextIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentText: { width: "80%" },
  footerCard: { gap: 12 },
  likeInf: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  likeBox: { flexDirection: "row", gap: 16, alignItems: "center" },
  likeStyle: { flexDirection: "row", gap: 4, alignItems: "center" },
  buttonStyle: { marginRight: "auto" },
});

export default CommentCard;
