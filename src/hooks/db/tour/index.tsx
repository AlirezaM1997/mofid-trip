import {
  ProjectListQuery,
  ProjectListQueryVariables,
  useProjectListLazyQuery,
} from "@src/gql/generated";
import { RootState } from "@src/store";
import { PAGE_SIZE } from "@src/settings";
import { useEffect, useState } from "react";
import { NetworkStatus } from "@apollo/client";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { setProjectSet } from "@src/slice/project-slice";

const hasIntersection = (a: any[], b: any[]) => a.some(item => b.includes(item));

const useTourTable = () => {
  const dispatch = useDispatch();
  const { tourList } = useSelector((state: RootState) => state.tourSlice);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | undefined>();
  const [data, setData] = useState<ProjectListQuery | undefined>();

  const [fetchProjectSet, { networkStatus: queryNetworkStatus }] = useProjectListLazyQuery({
    notifyOnNetworkStatusChange: false,
    onCompleted: data => setData(data),
  });

  useEffect(() => {
    setNetworkStatus(queryNetworkStatus);
  }, [queryNetworkStatus]);

  const syncTable = (variables: ProjectListQueryVariables) => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected) {
        fetchProjectSet({ variables: variables }).then(({ data }) =>
          dispatch(setProjectSet(data.projectList))
        );
      }
    });
  };

  const search = ({ search, filter, page }: ProjectListQueryVariables) => {
    if (!tourList.data) return [];
    let result = tourList.data;
    if (search) {
      result = result.filter(p => p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }
    if (filter) {
      if (filter?.tags) {
        result = result.filter(p => {
          const tagNames = p.tags.map(t => t.name);
          return hasIntersection(tagNames ?? [], filter.tags);
        });
      }
    }
    const pageSize = page?.pageSize ?? PAGE_SIZE;
    const pageNumber = page?.pageNumber ?? 1;
    return result.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
  };

  return { networkStatus, syncTable, search };
};

export default useTourTable;
