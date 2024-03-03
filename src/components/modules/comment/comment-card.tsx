import {
  CommentType,
  LikeObjectEnum,
  LikeStatusEnum,
  useLikeAddMutation,
} from "@src/gql/generated";
import moment from "jalali-moment";
import { router } from "expo-router";
import { HEIGHT, WIDTH } from "@src/constants";
import React, { useEffect, useState } from "react";
import ReportComment from "@modules/report/report-comment";
import { Button, Divider, Text, useTheme } from "@rneui/themed";
import { Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { AntDesign, Entypo, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const CommentCard = ({
  comment,
  refetch,
  push,
}: {
  comment: CommentType;
  refetch;
  push: string;
}) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const [likeAdd] = useLikeAddMutation();

  const handleOpen = () => setIsVisible(!isVisible);
  const handleClose = () => setIsVisible(false);
  const handleShowText = () => setShowText(!showText);
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
          <Pressable onPress={handleShowText} style={styles.commentText}>
            <Text numberOfLines={(!showText && 4) as number} caption>
              {comment.text}
            </Text>
          </Pressable>
          <Entypo
            size={14}
            color={theme.colors.grey2}
            name="dots-three-vertical"
            onPress={handleOpen}
          />
          <View style={styles.backDrop(isVisible)}>
            <View style={styles.dropDown}>
              <ReportComment closeDropDown={handleClose as () => void} id={comment.id as string} />
            </View>
          </View>
        </View>
        <Text caption type="grey3">
          {localizeNumber(moment(comment.createdDate).locale("fa").format("jD jMMMM jYYYY"))} .{" "}
          {comment?.user?.displayName ? comment?.user?.displayName : tr("no name")}
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
                {localizeNumber(comment?.likeCount as number)}
              </Text>
              <AntDesign name="like2" size={16} color={theme.colors.grey2} onPress={handleLike} />
            </View>
            <View style={styles.likeStyle}>
              <Text caption type="grey2">
                {localizeNumber(comment?.dislikeCount as number)}
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
                {localizeNumber(comment?.nestedComment?.length as number)}
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
  backDrop: ((isVisible: boolean) => ({
    display: isVisible ? "flex" : "none",
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    top: 25,
    left: -10,
  })) as ViewStyle,
  dropDown: {
    position: "absolute",
    left: 15,
    backgroundColor: "red",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121227" },
    }),
  },
  containerStyle: ((theme: { colors: { grey0: string } }) => ({
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: theme.colors.grey0,
    borderWidth: 1,
    gap: 16,
  })) as ViewStyle,
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
