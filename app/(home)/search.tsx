import React, { useMemo, useState } from "react";
import { Text } from "@rneui/themed";
import debounce from "lodash/debounce";
import { RootState } from "@src/store";
import { StyleSheet, View } from "react-native";
import SearchHost from "@organisms/search/host";
import SearchTour from "@organisms/search/tour";
import { setSearch } from "@src/slice/filter-slice";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import Container from "@src/components/atoms/container";
import SearchBar from "@src/components/modules/search-bar";
import TitleWithAction from "@modules/title-with-action";
import { router } from "expo-router";
import WhiteSpace from "@atoms/white-space";

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { search } = useSelector((state: RootState) => state.filterSlice);
  const [value, setValue] = useState(search);

  const debouncedOnChange = useMemo(() => debounce(t => dispatch(setSearch(t)), 1000), [search]);

  const handleChange = t => {
    setValue(t);
    debouncedOnChange(t);
  };

  return (
    <>
      <SearchBar onChangeText={handleChange} value={value} />
      <Container style={styles.container}>
        <View>
          <TitleWithAction
            size="body2"
            actionTitle={tr("See All")}
            onActionPress={() => router.push("/tour-list")}
            title={`${tr("all tours of")} ${search}`}
          />

          <WhiteSpace size={8} />
          <SearchTour />
        </View>

        <View>
          <TitleWithAction
            size="body2"
            actionTitle={tr("See All")}
            onActionPress={() => router.push("/host-list")}
            title={`${tr("all hosts of")} ${search}`}
          />

          <WhiteSpace size={8} />
          <SearchHost />
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: { gap: 24 },
});

export default SearchScreen;
