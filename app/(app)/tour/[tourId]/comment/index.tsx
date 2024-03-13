import React, { useState } from "react";
import Container from "@atoms/container";
import { Button, Text, useTheme } from "@rneui/themed";
import CommentCard from "@modules/comment/comment-card";
import LoadingIndicator from "@modules/Loading-indicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { CommentType, useTourCommentQuery } from "@src/gql/generated";
import AddCommentBottomSheet from "@modules/comment/add-comment-bottomsheet";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const TourCommentScreen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { tourId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { loading, data, refetch } = useTourCommentQuery({
    variables: {
      pk: tourId as string,
    },
  });

  const handleOpen = () => setIsVisible(true);

  if (loading && !data) return <LoadingIndicator />;

  const comment = data?.tourDetail?.commentSet;
  navigation.setOptions({ title: `${tr("comments of")} ${data?.tourDetail?.title}` });

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
                comment={comment as CommentType}
                key={comment?.id}
                refetch={refetch}
                push={`tour/${tourId}/comment` as string}
              />
            ))}
          </View>
        </Container>
      </ScrollView>
      <AddCommentBottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible as React.Dispatch<React.SetStateAction<boolean>>}
        refetch={refetch}
        id={tourId as string}
        name={data?.tourDetail?.title as string}
      />
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  bottomButtonLayout: { flex: 1 },
  containerStyle: {
    paddingVertical: 24,
    gap: 24,
  },
  commentInf: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentList: { gap: 16 },
});

export default TourCommentScreen;
