import { Divider } from "@rneui/themed";
import TourList from "@organisms/tour-list";
import HostList from "@organisms/host-list";
import { SetStateAction, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Container from "@src/components/atoms/container";
import Banner from "@src/components/atoms/banner/banner";
import SearchBar from "@src/components/modules/search-bar";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e: SetStateAction<string>) => {
    setSearchText(e);
  };

  return (
    <>
      <SearchBar onChangeText={handleChange} value={searchText} />
      <Divider />
      <ScrollView>
        <Container style={style.container}>
          <Banner name="home-1" />
          <TourList />
          <Banner name="home-2" />
          <HostList />
        </Container>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: { marginTop: 4, gap: 20 },
});
