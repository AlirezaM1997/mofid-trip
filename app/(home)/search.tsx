import React from "react";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View } from "react-native";
import HostSearch from "@organisms/search/host";
import TourSearch from "@organisms/search/tour";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import SearchBar from "@src/components/modules/search-bar";

const SearchScreen: React.FC = () => {
  const { tr } = useTranslation();
  const { search } = useSelector((state: RootState) => state.filterSlice);

  return (
    <>
      <SearchBar />
      {search ? (
        <Container style={styles.container}>
          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => router.push("/tour-list")}
              title={`${tr("all tours of")} ${search}`}
            />

            <WhiteSpace size={8} />
            <TourSearch />
          </View>

          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => router.push("/host-list")}
              title={`${tr("all hosts of")} ${search}`}
            />

            <WhiteSpace size={8} />
            <HostSearch />
          </View>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { gap: 24 },
});

export default SearchScreen;
