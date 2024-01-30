import React from "react";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import useIsRtl from "@src/hooks/localization";
import { ListItem, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Octicons, Feather } from "@expo/vector-icons";
import { CategoryEnum } from "@src/slice/filter-slice";

const FilterList = ({ setIndex }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { category, filter } = useSelector((state: RootState) => state.filterSlice);

  const { price } = filter;

  return (
    <>
      <ListItem bottomDivider onPress={() => setIndex(1)}>
        <ListItem.Content>
          <ListItem.Title>
            {tr("category")} <Octicons name="dot-fill" size={14} color={theme.colors.primary} />
          </ListItem.Title>

          <ListItem.Subtitle>
            {category === CategoryEnum.HOST ? tr("host") : tr("tour")}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(2)}>
        <ListItem.Content>
          <ListItem.Title>
            {tr("price")}
            {price && <Octicons name="dot-fill" size={14} color={theme.colors.primary} />}
          </ListItem.Title>

          <ListItem.Subtitle>
            {price && `${price?.low} ${tr("to")} ${price?.high}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(3)}>
        <ListItem.Content>
          <ListItem.Title>{tr("from city")}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(4)}>
        <ListItem.Content>
          <ListItem.Title>{tr("destination city")}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(5)}>
        <ListItem.Content>
          <ListItem.Title>{`${tr("capacity")} , ${tr("gender")}`}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(6)}>
        <ListItem.Content>
          <ListItem.Title>{tr("date")}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>
    </>
  );
};

export default FilterList;
