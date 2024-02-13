import Input from "@atoms/input";
import debounce from "lodash/debounce";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import React, { useMemo, useState } from "react";
import { setFilter } from "@src/slice/filter-slice";
import useTranslation from "@src/hooks/translation";
import { TourFilterType } from "@src/gql/generated";
import { useDispatch, useSelector } from "react-redux";

const FilterDestination = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const { filter } = useSelector((state: RootState) => state.filterSlice);
  const tourFilter = filter as TourFilterType;

  const [value, setValue] = useState(tourFilter?.destinationLocation?.city);

  const debouncedOnChange = useMemo(
    () =>
      debounce(
        city =>
          dispatch(
            setFilter({
              ...tourFilter,
              destinationLocation: {
                province: tourFilter?.destinationLocation?.province || "",
                city,
              },
            })
          ),
        1500
      ),
    [tourFilter.destinationLocation]
  );

  const changeHandler = t => {
    const { destinationLocation, ...restTourFilter } = tourFilter;

    setValue(t);
    if (!t) {
      dispatch(
        setFilter({
          ...restTourFilter,
        })
      );
    } else {
      debouncedOnChange(t);
    }
  };

  return (
    <Container>
      <Input value={value} placeholder={tr("destination city")} onChangeText={changeHandler} />
    </Container>
  );
};

export default FilterDestination;
