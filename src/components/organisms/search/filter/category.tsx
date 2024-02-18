import React from "react";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { CheckBox, Divider } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import { CategoryEnum, setCategory } from "@src/slice/filter-slice";

const FilterCategory = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { category } = useSelector((state: RootState) => state.filterSlice);

  const handleCheckCategory = category => dispatch(setCategory(category));

  return (
    <Container>
      <CheckBox
        title={tr("host")}
        iconType="material-community"
        checkedIcon="radiobox-marked"
        uncheckedIcon="radiobox-blank"
        checked={category === CategoryEnum.HOST}
        onPress={() => handleCheckCategory(CategoryEnum.HOST)}
      />

      <WhiteSpace size={16} />
      <Divider />
      <WhiteSpace size={16} />

      <CheckBox
        title={tr("tour")}
        iconType="material-community"
        checkedIcon="radiobox-marked"
        uncheckedIcon="radiobox-blank"
        checked={category === CategoryEnum.TOUR}
        onPress={() => handleCheckCategory(CategoryEnum.TOUR)}
      />
    </Container>
  );
};

export default FilterCategory;
