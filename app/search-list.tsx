import React from "react";
import { View } from "react-native";
import { RootState } from "@src/store";
import { Divider } from "@rneui/themed";
import { useSelector } from "react-redux";
import SearchBar from "@modules/search-bar";
import Filter from "@organisms/search/filter";
import SearchHost from "@organisms/search/host";
import SearchTour from "@organisms/search/tour";
import { CategoryEnum } from "@src/slice/filter-slice";

const SearchList = () => {
  const { category } = useSelector((state: RootState) => state.filterSlice);

  return (
    <>
      <SearchBar />
      {/* <Filter /> */}
      <Divider />
      {category === CategoryEnum.HOST ? <SearchHost /> : <SearchTour />}
    </>
  );
};

export default SearchList;
