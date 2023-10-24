import { Divider } from "@rneui/themed";
import Banner from "@src/components/atoms/banner/banner";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import SearchBar from "@src/components/modules/search-bar";
import TitleWithAction from "@src/components/modules/title-with-action";
import DiscountPlaceList from "@src/components/organisms/discount-place-list";
import FreePlacesCards from "@src/components/organisms/free-places-cards";
import NewPlaceList from "@src/components/organisms/new-place-list";
import PlaceCategoryCard from "@src/components/organisms/place-category-card";
import Tags from "@src/components/organisms/tags";
import TrendingPlaceList from "@src/components/organisms/trending-place-list";
import { Project_Category, Tag } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { setProjectSetArguments } from "@src/slice/project-slice";
import { RootState } from "@src/store";
import { useRouter } from "expo-router/src/hooks";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const { projectSetArguments } = useSelector(
    (state: RootState) => state.projectSlice
  );

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(e);
  };

  const handlePressCategory = () => {
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          categories: Object.values(Project_Category),
        },
      })
    );
    router.push("/search");
  };

  const handlePressByTag = (tag: Tag) => {
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          tags: [tag],
        },
      })
    );
    router.push('/search')
  };

  return (
    <>
      <SearchBar onChangeText={handleChange} value={searchText} />
      <Divider />
      <ScrollView>
        <WhiteSpace size={20} />
        <Container style={style.container}>
          <Banner name="home-1" />
          <View style={style.tags}>
            <Tags />
          </View>
        </Container>
        <WhiteSpace size={20} />

        <Container>
          <TitleWithAction
            title={tr("Place Category")}
            actionTitle={tr("See All")}
            onActionPress={handlePressCategory}
          />
        </Container>
        <PlaceCategoryCard />

        <WhiteSpace size={20} />

        <Container>
          <TitleWithAction
            title={tr("Trending Place")}
            actionTitle={tr("See All")}
            onActionPress={() => handlePressByTag(Tag.Trend)}
          />
        </Container>
        <TrendingPlaceList />

        <Container style={{ marginTop: 20 }}>
          <Banner name="home-2" />
        </Container>

        <Container>
          <TitleWithAction
            title={tr("New Place")}
            actionTitle={tr("See All")}
            onActionPress={() => handlePressByTag(Tag.New)}
          />
        </Container>
        <NewPlaceList />

        <WhiteSpace size={10} />

        <FreePlacesCards />

        <WhiteSpace size={20} />
        <Container style={style.container}>
          <TitleWithAction
            title={tr("With Discount Place")}
            actionTitle={tr("See All")}
            onActionPress={() => handlePressByTag(Tag.Discount)}
          />
        </Container>
        <WhiteSpace size={10} />
        <DiscountPlaceList />
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: { marginTop: 4 },
  tags: { marginTop: 12 },
});
