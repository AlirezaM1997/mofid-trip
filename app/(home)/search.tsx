import React from "react";
import { router } from "expo-router";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { CategoryEnum, setCategory } from "@src/slice/filter-slice";
import { useDispatch, useSelector } from "react-redux";
import TitleWithAction from "@modules/title-with-action";
import SearchBar from "@src/components/modules/search-bar";
import SearchTourHorizontalList from "@organisms/search/tour/horizontalList";
import SearchHostHorizontalList from "@organisms/search/host/horizontalList";
import { useProjectListSearchQuery, useTourListSearchQuery } from "@src/gql/generated";

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { search, page, sort } = useSelector((state: RootState) => state.filterSlice);

  const { data: hostData, loading: hostLoading } = useProjectListSearchQuery({
    variables: {
      search,
      page,
      sort,
    },
  });

  const { data: tourData, loading: tourLoading } = useTourListSearchQuery({
    variables: {
      search,
      page,
      sort,
    },
  });

  const routerHandler = (category: CategoryEnum) => {
    router.push("/search-list");
    dispatch(setCategory(category));
  };

  return (
    <>
      <SearchBar />
      {search ? (
        <View>
          <Container>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => routerHandler(CategoryEnum.TOUR)}
              title={`${tr("all tours of")} ${search}`}
            />
          </Container>
          <WhiteSpace size={8} />
          <SearchTourHorizontalList data={tourData} loading={tourLoading} />
          <WhiteSpace size={24} />
          <Container>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => routerHandler(CategoryEnum.HOST)}
              title={`${tr("all hosts of")} ${search}`}
            />
          </Container>
          <WhiteSpace size={8} />
          <SearchHostHorizontalList data={hostData} loading={hostLoading} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchScreen;
