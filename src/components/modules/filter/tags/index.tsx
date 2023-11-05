import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Platform, StyleSheet, View } from "react-native";
import { ProjectTagEnum } from "@src/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { setProjectSetArguments } from "@src/slice/project-slice";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import useIsRtl from "@src/hooks/localization";

const FilterTags = () => {
  const isRtl = useIsRtl();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice);

  const handleChange = (k, v) => {
    const tags = projectSetArguments?.filter?.tags || [];
    var newTags = [];
    if (projectSetArguments?.filter?.tags?.includes(v)) {
      newTags = tags.filter(i => i !== v);
    } else {
      newTags = [...tags, v];
    }
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          ...projectSetArguments.filter,
          tags: newTags,
        },
      })
    );
  };

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title style={styles.label(isRtl)}>{tr("Tags")}</ListItem.Title>
        </ListItem.Content>
      }
      icon={<Feather name="chevron-down" size={24} color="black" />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}>
      {Object.keys(ProjectTagEnum).map((k, index) => (
        <ListItem key={index} bottomDivider onPress={() => handleChange(k, ProjectTagEnum[k])}>
          <ListItem.Content>
            <View style={styles.row}>
              <ListItem.CheckBox
                checked={projectSetArguments.filter?.tags.includes(ProjectTagEnum[k])}
                onPress={() => handleChange(k, ProjectTagEnum[k])}
              />
              <ListItem.Title style={styles.label(isRtl)}>{tr(ProjectTagEnum[k])}</ListItem.Title>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
};

// TODO: refactor style base on platform with selector!!
const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    ...Platform.select({
      web: {
        alignItems: "center",
      },
    }),
  },
  label: isRtl => ({
    fontFamily: isRtl
      ? "DanaNoEn"
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: "400",
  }),
});

export default FilterTags;
