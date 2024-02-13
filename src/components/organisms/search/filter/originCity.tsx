import Input from "@atoms/input";
import debounce from "lodash/debounce";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import React, { useMemo, useState } from "react";
import { setFilter } from "@src/slice/filter-slice";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import { TourFilterType } from "@src/gql/generated";

const FilterOriginCity = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const { filter } = useSelector((state: RootState) => state.filterSlice);
  const tourFilter = filter as TourFilterType;

  const [value, setValue] = useState(tourFilter?.originLocation?.city);

  const debouncedOnChange = useMemo(
    () =>
      debounce(
        city =>
          dispatch(
            setFilter({
              ...tourFilter,
              originLocation: {
                province: tourFilter?.originLocation?.province || "",
                city,
              },
            })
          ),
        1500
      ),
    [tourFilter.originLocation]
  );

  const changeHandler = t => {
    const { originLocation, ...restTourFilter } = tourFilter;
    
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
      <Input value={value} placeholder={tr("origin city")} onChangeText={changeHandler} />
    </Container>
  );
};

export default FilterOriginCity;
