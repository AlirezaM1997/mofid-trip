import { RootState } from "@src/store";
import { Divider } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import SearchBar from "@modules/search-bar";
import Filter from "@organisms/search/filter";
import SearchHost from "@organisms/search/host";
import SearchTour from "@organisms/search/tour";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { CategoryEnum } from "@src/slice/filter-slice";

const SearchList = () => {
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);
  const navigation = useNavigation();
  const { category } = useSelector((state: RootState) => state.filterSlice);

  useEffect(() => {
    isFocused && setKey(prevKey => prevKey + 1);
  }, [isFocused]);

  useEffect(() => {
    return () => navigation.setParams({ isShowMap: "true" });
  }, []);

  return (
    <>
      <SearchBar />
      <Filter />
      <Divider />
      {category === CategoryEnum.HOST ? <SearchHost key={key} /> : <SearchTour key={key} />}
    </>
  );
};

export default SearchList;
