import React, { useState, useEffect } from "react";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Text, useTheme } from "@rneui/themed";
import Container from "@atoms/container";
import { ScrollView, StyleSheet, View, Platform } from "react-native";
import moment from "jalali-moment";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  CommentObjectEnum,
  LikeObjectEnum,
  LikeStatusEnum,
  TourQueryType,
  useCommentAddMutation,
  useHostCommentQuery,
  useLikeAddMutation,
} from "@src/gql/generated";
import { useLocalSearchParams, useNavigation } from "expo-router";
import LoadingIndicator from "@modules/Loading-indicator";
import WhiteSpace from "@atoms/white-space";
import CommentCardReplay from "@modules/comment/comment-card-replay";
import BottomButtonLayout from "@components/layout/bottom-button";
import Input from "@atoms/input";
import Toast from "react-native-toast-message";
import ReportComment from "@modules/report/report-comment";
import { HEIGHT, WIDTH } from "@src/constants";

const TourCommentReplay = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { projectId, commentId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleOpen = () => setIsVisible(!isVisible);
  const handleClose = () => setIsVisible(false);

  const { loading, data, refetch } = useHostCommentQuery({
    variables: { pk: projectId as string },
  });
  const [likeAdd] = useLikeAddMutation();
  const [commentAdd] = useCommentAddMutation();

  if (loading && !data) return <LoadingIndicator />;

  navigation.setOptions({ title: `${tr("comments of")} ${data?.projectDetail?.name}` });

  const comment = data?.projectDetail?.commentSet.find(comment => comment.id === commentId);

  const handleLike = async () => {
    const { data } = await likeAdd({
      variables: {
        data: {
          objectType: LikeObjectEnum.Comment,
          objectId: +commentId,
          status: LikeStatusEnum.Like,
        },
      },
    });
    if (data.likeAdd.status === "OK") {
      refetch();
    }
  };
  const handleDislike = async () => {
    const { data } = await likeAdd({
      variables: {
        data: {
          objectType: LikeObjectEnum.Comment,
          objectId: +commentId,
          status: LikeStatusEnum.Dislike,
        },
      },
    });
    if (data.likeAdd.status === "OK") {
      refetch();
    }
  };

  const handleComment = async () => {
    const { data } = await commentAdd({
      variables: {
        data: {
          objectType: CommentObjectEnum.Comment,
          objectId: commentId.toString(),
          text: value,
        },
      },
    });
    if (data.commentAdd.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("your comment has been successfully registered"),
      });
      refetch();
      setValue("");
    }
  };

  const closeDropDown = () => window.addEventListener("click", handleClose);

  useEffect(() => {
    closeDropDown();
    return () => window.removeEventListener("click", handleClose);
  }, []);

  return (
    <BottomButtonLayout
      contentContainerStyle={styles.bottomButtonLayout}
      buttons={[
        <Input
          placeholder={tr("your comment ...")}
          value={value}
          onChangeText={text => setValue(text)}
          leftIcon={
            value !== "" && (
              <MaterialIcons
                onPress={handleComment}
                name="send"
                size={24}
                style={styles.sendIcon}
              />
            )
          }
        />,
      ]}>
      <ScrollView style={styles.containerStyle}>
        <Container style={styles.headerComment}>
          <Text subtitle1 bold>
            {tr("comment registered")}
          </Text>
          <View style={styles.comment(theme)}>
            <View style={styles.headerCommentBox}>
              <View style={styles.commentTextInf}>
                <View style={styles.commentText}>
                  <Text numberOfLines={4} caption>
                    {comment.text}
                  </Text>
                </View>
                <Entypo
                  name="dots-three-vertical"
                  size={14}
                  color={theme.colors.grey2}
                  onPress={handleOpen}
                />
                <View style={styles.backDrop(isVisible)}>
                  <View style={styles.dropDown}>
                    <ReportComment closeDropDown={handleClose} id={comment.id} />
                  </View>
                </View>
              </View>
              <Text caption type="grey3">
                {localizeNumber(moment(comment.createdDate).locale("fa").format("jD jMMMM jYYYY"))}{" "}
                . {comment.user.fullname}
              </Text>
            </View>
            <View style={styles.likeInf}>
              <Text caption type="grey2">
                {tr("was this review helpful?")}
              </Text>
              <View style={styles.likeBox}>
                <View style={styles.likeStyle}>
                  <Text caption type="grey2">
                    {localizeNumber(comment.likeCount)}
                  </Text>
                  <AntDesign
                    name="like2"
                    size={16}
                    color={theme.colors.grey2}
                    onPress={handleLike}
                  />
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
          </View>
          <WhiteSpace />
          <View style={styles.nestedCommentInf}>
            <Text subtitle1 bold>
              {tr("the answers")}
            </Text>
            <Text caption type="grey2">
              {localizeNumber(comment.nestedComment.length)} {tr("replay")}
            </Text>
          </View>
        </Container>
        <View style={styles.nestedCommentList}>
          {comment.nestedComment.map((comment, i) => (
            <CommentCardReplay
              comment={comment as TourQueryType["commentSet"][0]["nestedComment"][0]}
              refetch={refetch}
              key={i}
              index={i}
            />
          ))}
        </View>
      </ScrollView>
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  bottomButtonLayout: { flex: 1 },
  sendIcon: { transform: [{ rotateZ: "180deg" }] },
  containerStyle: { gap: 16 },
  headerComment: { paddingVertical: 24, gap: 16 },
  comment: theme => ({
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: theme.colors.grey0,
    borderWidth: 1,
    gap: 16,
  }),
  headerCommentBox: { gap: 4 },
  commentTextInf: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentText: { width: "80%" },
  likeInf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeBox: { flexDirection: "row", gap: 16, alignItems: "center" },
  likeStyle: { flexDirection: "row", gap: 4, alignItems: "center" },
  nestedCommentInf: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  nestedCommentList: { gap: 40 },
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121227" },
    }),
  },
});

export default TourCommentReplay;
