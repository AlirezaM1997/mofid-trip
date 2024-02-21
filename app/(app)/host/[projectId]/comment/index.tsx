import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ProjectQueryType, useHostCommentQuery } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useLocalSearchParams, useNavigation } from "expo-router";
import LoadingIndicator from "@modules/Loading-indicator";
import Container from "@atoms/container";
import { Button, Text, useTheme } from "@rneui/themed";
import CommentCard from "@modules/comment/comment-card";
import BottomButtonLayout from "@components/layout/bottom-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddCommentBottomSheet from "@modules/comment/add-comment-bottomsheet";

const HostCommentScreen = () => {
  const { projectId } = useLocalSearchParams();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const navigation = useNavigation();
  const { loading, data, refetch } = useHostCommentQuery({
    variables: {
      pk: projectId as string,
    },
  });
  if (loading && !data) return <LoadingIndicator />;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const comment = data?.projectDetail?.commentSet;
  const handleOpen = () => setIsVisible(true);

  navigation.setOptions({ title: `${tr("comments of")} ${data?.projectDetail?.name}` });

  return (
    <BottomButtonLayout
      contentContainerStyle={styles.bottomButtonLayout}
      buttons={[
        <Button
          onPress={handleOpen}
          icon={
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={16}
              color={theme.colors.white}
            />
          }>
          {tr("add comment")}
        </Button>,
      ]}>
      <ScrollView>
        <Container style={styles.containerStyle}>
          <View style={styles.commentInf}>
            <Text subtitle1 bold>
              {tr("comments")}
            </Text>
            <Text caption type="grey2">{`${localizeNumber(comment?.length as number)} ${tr(
              "comment"
            )}`}</Text>
          </View>
          <View style={styles.commentList}>
            {comment?.map(comment => (
              <CommentCard
                comment={comment as ProjectQueryType["commentSet"][0]}
                key={comment?.id}
                refetch={refetch}
                push={`host/${projectId}/comment`}
              />
            ))}
          </View>
        </Container>
      </ScrollView>
      <AddCommentBottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        refetch={refetch}
        id={projectId as string}
        name={data?.projectDetail?.name}
      />
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  bottomButtonLayout: { flex: 1 },
  containerStyle:{ paddingVertical: 24, gap: 24 },
  commentInf:{ flexDirection: "row", justifyContent: "space-between" },
  commentList:{ gap: 16 }
})

export default HostCommentScreen;
