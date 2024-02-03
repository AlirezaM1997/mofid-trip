import React from "react";
import moment from "jalali-moment";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { ListItem, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { TourFilterType } from "@src/gql/generated";
import { Octicons, Feather } from "@expo/vector-icons";
import { CategoryEnum } from "@src/slice/filter-slice";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";

const FilterList = ({ setIndex }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const { category, filter } = useSelector((state: RootState) => state.filterSlice);

  const { price, capacity, dateRange, originLocation, destinationLocation } =
    filter as TourFilterType;

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
            {tr("price")}&nbsp;
            {price && <Octicons name="dot-fill" size={14} color={theme.colors.primary} />}
          </ListItem.Title>

          <ListItem.Subtitle>
            {price && `${formatPrice(price?.low)} ${tr("to")} ${formatPrice(price?.high)}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      {category === CategoryEnum.TOUR && (
        <ListItem bottomDivider onPress={() => setIndex(3)}>
          <ListItem.Content>
            <ListItem.Title>
              {tr("origin city")}&nbsp;
              {originLocation && (
                <Octicons name="dot-fill" size={14} color={theme.colors.primary} />
              )}
            </ListItem.Title>
            <ListItem.Subtitle>{originLocation?.city}</ListItem.Subtitle>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>
      )}

      <ListItem bottomDivider onPress={() => setIndex(4)}>
        <ListItem.Content>
          <ListItem.Title>
            {tr("destination city")}&nbsp;
            {destinationLocation && (
              <Octicons name="dot-fill" size={14} color={theme.colors.primary} />
            )}
          </ListItem.Title>
          <ListItem.Subtitle>{destinationLocation?.city}</ListItem.Subtitle>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(5)}>
        <ListItem.Content>
          <ListItem.Title>
            {`${tr("capacity")} , ${tr("gender")}`}&nbsp;
            {capacity?.female || capacity?.male ? (
              <Octicons name="dot-fill" size={14} color={theme.colors.primary} />
            ) : (
              ""
            )}
          </ListItem.Title>
          <ListItem.Subtitle>
            {capacity?.female ? `${capacity?.female} ${tr("female")}` : ""}
            {capacity?.female && capacity?.male ? "," : ""}
            {capacity?.male ? `${capacity?.male} ${tr("male")}` : ""}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <ListItem bottomDivider onPress={() => setIndex(6)}>
        <ListItem.Content>
          <ListItem.Title>
            {tr("date")}&nbsp;
            {dateRange?.start && (
              <Octicons name="dot-fill" size={14} color={theme.colors.primary} />
            )}
          </ListItem.Title>
          <ListItem.Subtitle>
            {dateRange?.start
              ? moment(dateRange?.start, "YYYY-MM-DD").locale("fa").format("jD jMMMM")
              : ""}
            {dateRange?.end
              ? ` - ${moment(dateRange?.end, "YYYY-MM-DD").locale("fa").format("jD jMMMM")}`
              : ""}
          </ListItem.Subtitle>
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
