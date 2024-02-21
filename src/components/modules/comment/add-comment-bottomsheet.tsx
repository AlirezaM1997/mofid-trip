import Input from "@atoms/input";
import { useURL } from "expo-linking";
import { HEIGHT } from "@src/constants";
import React, { useState } from "react";
import Container from "@atoms/container";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { BottomSheet, Button, Divider, Text } from "@rneui/themed";
import { CommentObjectEnum, useCommentAddMutation } from "@src/gql/generated";

const AddCommentBottomSheet = ({ isVisible, setIsVisible, refetch, id, name }:{ isVisible: boolean, id: string, name: string }) => {
  const { tr } = useTranslation();
  const [value, setValue] = useState<string>("");
  const url = useURL();

  const [commentAdd] = useCommentAddMutation();

  const handleClose = () => {
    setIsVisible(false);
    setValue("");
  };
  const handleComment = async () => {
    const { data } = await commentAdd({
      variables: {
        data: {
          objectType:
            url?.split("/")[3] === "tour" ? CommentObjectEnum.Tour : CommentObjectEnum.Project,
          objectId: id,
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
      handleClose();
      setValue("");
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={handleClose}
      containerStyle={styles.bottomSheetStyle}>
      <View style={styles.containerStyle}>
        <Container style={styles.header}>
          <Text numberOfLines={1} caption type="grey3">
            {`${tr("about")} ${name ? name : ""}`}
          </Text>
          <View style={styles.headerRight}>
            <Text>{tr("your point of view")}</Text>
            <AntDesign onPress={handleClose} name="arrowright" size={19} />
          </View>
        </Container>
        <Divider />
        <Container style={styles.commentInput}>
          <Text body2>{tr("describe your point of view")}</Text>
          <Input
            multiline={true}
            numberOfLines={10}
            placeholder={tr("comment text...")}
            value={value}
            onChangeText={text => setValue(text)}
          />
        </Container>
        <View style={styles.footer}>
          <Divider />
          <Container style={styles.button}>
            <Button onPress={handleComment} disabled={value === "" ? true : false}>
              {tr("register a comment")}
            </Button>
          </Container>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    height: HEIGHT,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "flex-end",
    paddingVertical: 0,
  },
  containerStyle: { height: HEIGHT, position: "relative" },
  header: {
    flexDirection: "row",
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: { flexDirection: "row", gap: 20 },
  commentInput: { paddingVertical: 24, gap: 8 },
  footer: { position: "absolute", bottom: 0, width: "100%" },
  button: { paddingVertical: 16 },
});

export default AddCommentBottomSheet;
