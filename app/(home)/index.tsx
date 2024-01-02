import { Divider } from "@rneui/themed";
import TourList from "@organisms/tour-list";
import HostList from "@organisms/host-list";
import { SetStateAction, useState } from "react";
import Container from "@src/components/atoms/container";
import Banner from "@src/components/atoms/banner/banner";
import SearchBar from "@src/components/modules/search-bar";
import { ScrollView } from "react-native";
import WhiteSpace from "@atoms/white-space";

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
        <WhiteSpace size={20} />
        <Container>
          <Banner name="home-2" url={"host/create"} />
        </Container>

        <WhiteSpace size={32} />
        <HostList />

        <WhiteSpace size={32} />

        <Container>
          <Banner name="home-1" url={"tour/create"} />
        </Container>

        <WhiteSpace size={32} />

        <TourList />

        <WhiteSpace size={10} />
      </ScrollView>
    </>
  );
}
