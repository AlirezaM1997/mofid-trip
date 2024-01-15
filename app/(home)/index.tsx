import { Divider } from "@rneui/themed";
import { ScrollView } from "react-native";
import TourList from "@organisms/tour-list";
import HostList from "@organisms/host-list";
import WhiteSpace from "@atoms/white-space";
import { SetStateAction, useState } from "react";
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
      <SearchBar showSearchText={false} />
      <Divider />
      <ScrollView>
        <WhiteSpace size={20} />
        <Container>
          <Banner name="home-2" />
        </Container>

        <WhiteSpace size={32} />
        <HostList />

        <WhiteSpace size={32} />

        <Container>
          <Banner name="home-1" />
        </Container>

        <WhiteSpace size={32} />

        <TourList />

        <WhiteSpace size={10} />
      </ScrollView>
    </>
  );
}
