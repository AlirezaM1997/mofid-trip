import { RootState } from "@src/store";
import { PAGE_SIZE } from "@src/settings";
import { useEffect, useState } from "react";
import { NetworkStatus } from "@apollo/client";
import { setTourList } from "@src/slice/tour-slice";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import {
  TourListQuery,
  useTourListLazyQuery,
  TourListQueryVariables,
  TourQueryType,
} from "@src/gql/generated";

const useTourTable = () => {
  const dispatch = useDispatch();
  const { tourList } = useSelector((state: RootState) => state.tourSlice);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | undefined>();
  const [data, setData] = useState<TourListQuery | undefined>();

  const [fetchTourSet, { networkStatus: queryNetworkStatus }] = useTourListLazyQuery({
    notifyOnNetworkStatusChange: false,
    onCompleted: data => setData(data),
  });

  useEffect(() => {
    setNetworkStatus(queryNetworkStatus);
  }, [queryNetworkStatus]);

  const syncTable = (variables: TourListQueryVariables) => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected) {
        fetchTourSet({ variables: variables }).then(({ data }) => {
          if (data) dispatch(setTourList(data.tourList));
        });
      }
    });
  };

  const search = ({ search, filter, page }: TourListQueryVariables) => {
    if (!tourList.data) return [];

    let result = tourList.data;
    if (search) {
      result = result.filter(p => p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }
    // if (filter) {
    //   if (filter?.tags) {
    //     result = result.filter(p => {
    //       const tagNames = p.tags.map(t => t.name);
    //       return hasIntersection(tagNames ?? [], filter.tags);
    //     });
    //   }
    // }
    const pageSize = page?.pageSize ?? PAGE_SIZE;
    const pageNumber = page?.pageNumber ?? 1;
    return result.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
  };

  const findById = (id: string): TourQueryType | undefined =>
    tourList?.data?.find(p => p.id === id);

  return { networkStatus, syncTable, search, findById };
};

export default useTourTable;
