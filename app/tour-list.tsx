import React from "react";
import { Divider } from "@rneui/themed";
import SearchTourList from "@modules/search/tour/list";
import SearchBar from "@src/components/modules/search-bar";

const TourListScreen: React.FC = () => {
  return (
    <>
      <SearchBar />
      <Divider />

      <SearchTourList />
    </>
  );
};

export default TourListScreen;
