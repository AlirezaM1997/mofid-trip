import {
  CommentType,
  LikeObjectEnum,
  LikeStatusEnum,
  CommentObjectEnum,
  useLikeAddMutation,
  useTourCommentQuery,
  useCommentAddMutation,
} from "@src/gql/generated";
import Input from "@atoms/input";
import moment from "jalali-moment";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import Toast from "react-native-toast-message";
import { HEIGHT, WIDTH } from "@src/constants";
import React, { useEffect, useState } from "react";
import { Colors, Text, useTheme } from "@rneui/themed";
import LoadingIndicator from "@modules/Loading-indicator";
import ReportComment from "@modules/report/report-comment";
import { useLocalSearchParams, useNavigation } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import CommentCardReplay from "@modules/comment/comment-card-replay";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const TourCommentReplay = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { tourId, commentId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [likeAdd] = useLikeAddMutation();
  const [commentAdd] = useCommentAddMutation();
  const { loading, data, refetch } = useTourCommentQuery({ variables: { pk: tourId as string } });
  
  const handleOpen = () => setIsVisible(!isVisible);
  const handleClose = () => setIsVisible(false);

  const handleLike = async () => {
    const { data } = await likeAdd({
      variables: {
        data: {
          objectType: LikeObjectEnum.Comment,
          objectId: +(commentId as string) ,
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
          objectId: +(commentId as string),
          status: LikeStatusEnum.Dislike,
        },
      },
    });
    if (data?.likeAdd?.status === "OK") {
      refetch();
    }
  };

  const handleComment = async () => {
    const { data } = await commentAdd({
      variables: {
        data: {
          objectType: CommentObjectEnum.Comment,
          objectId: commentId as string,
          text: value,
        },
      },
    });
    if (data?.commentAdd?.status === "OK") {
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

  if (loading && !data) return <LoadingIndicator />;

  navigation.setOptions({ title: `${tr("comments of")} ${data?.tourDetail?.title}` });

  const comment = data?.tourDetail?.commentSet?.find(comment => comment?.id === commentId);

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
                    {comment?.text}
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
                    <ReportComment closeDropDown={handleClose} id={comment?.id as string} />
                  </View>
                </View>
              </View>
              <Text caption type="grey3">
                {localizeNumber(moment(comment?.createdDate).locale("fa").format("jD jMMMM jYYYY"))}{" "}
                . {comment?.user as string}
              </Text>
            </View>
            <View style={styles.likeInf}>
              <Text caption type="grey2">
                {tr("was this review helpful?")}
              </Text>
              <View style={styles.likeBox}>
                <View style={styles.likeStyle}>
                  <Text caption type="grey2">
                    {localizeNumber(comment?.likeCount as number)}
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
                    {localizeNumber(comment?.dislikeCount as number)}
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
              {localizeNumber(comment?.nestedComment?.length as number)} {tr("replay")}
            </Text>
          </View>
        </Container>
        <View style={styles.nestedCommentList}>
          {comment?.nestedComment?.map((comment, i) => (
            <CommentCardReplay
              comment={comment as CommentType}
              refetch={refetch}
              key={i}
              index={i as number}
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
  comment: ((theme: { colors: { grey0: keyof Colors; }; }) => ({
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: theme.colors.grey0,
    borderWidth: 1,
    gap: 16,
  })) as ViewStyle,
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
  likeBox: { 
    flexDirection: "row", 
    gap: 16, 
    alignItems: "center" 
  },
  likeStyle: { 
    flexDirection: "row", 
    gap: 4, 
    alignItems: "center" 
  },
  nestedCommentInf: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  nestedCommentList: { gap: 40 },
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121227" },
    }),
  },
});

export default TourCommentReplay;
