import { RootState } from "@src/store";
import { NetworkStatus } from "@apollo/client";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { setProjectSet } from "@src/slice/project-slice";
import {
  Exact,
  ProjectFilterType,
  ProjectListQueryVariables,
  ProjectQueryType,
  useProjectListLazyQuery,
} from "@src/gql/generated";
import { string } from "yup";

type SearchType = {
  searchText?: string;
  filter?: ProjectFilterType;
};

const hasIntersection = (a: any[], b: any[]) => a.some(item => b.includes(item));

const useProjectTable = () => {
  const dispatch = useDispatch();
  const { projectSet } = useSelector((state: RootState) => state.projectSlice);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | undefined>();
  const [data, setData] = useState<ProjectQueryType[] | undefined>();

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
        fetchProjectSet({variables: variables}).then(({data}) => dispatch(setProjectSet(data.projectList)))
      }
    });
  };

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready && data) {
      dispatch(setProjectSet(data.projectList));
    }
  }, [networkStatus, data]);

  const search = ({ searchText, filter }: SearchType) => {
    if (!projectSet.data) return [];
    let result = projectSet.data;
    if (searchText) {
      result = result.filter(p =>
        p.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
    }
    if (filter) {
      if (filter?.tags) {
        result = result.filter(p => {
          const tagNames = p.tags.map(t => t.name);
          return hasIntersection(tagNames ?? [], filter.tags);
        });
      }
    }
    return result;
  };

  return { networkStatus, syncTable, search };
};

export default useProjectTable;
