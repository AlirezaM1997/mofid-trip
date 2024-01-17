import React from "react";
import { Divider } from "@rneui/themed";
import SearchHostMap from "@modules/search/host/map";
import SearchHostList from "@modules/search/host/list";
import SearchBar from "@src/components/modules/search-bar";

const HostListScreen: React.FC = () => {
  return (
    <>
      <SearchBar />
      <Divider />
      <SearchHostMap />
      <SearchHostList />
    </>
  );
};

export default HostListScreen;
