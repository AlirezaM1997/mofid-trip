import { RootState } from "@src/store";
import { NetworkStatus } from "@apollo/client";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { setProjectSet } from "@src/slice/project-slice";
import { Exact, ProjectSetQueryVariables, useProjectSetLazyQuery } from "@src/gql/generated";

const useProjectTable = () => {
  const dispatch = useDispatch();
  const { projectSet } = useSelector((state: RootState) => state.projectSlice);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | undefined>();
  const [data, setData] = useState<Exact<{ projectSet: ProjectType[] }> | undefined>();

  const [fetchProjectSet, { networkStatus: queryNetworkStatus }] = useProjectSetLazyQuery({
    notifyOnNetworkStatusChange: false,
    onCompleted: (data) => setData(data),
  });

  useEffect(() => {
    setNetworkStatus(queryNetworkStatus);
  }, [queryNetworkStatus]);

  const syncTable = (variables: ProjectSetQueryVariables) => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected && "page" in variables) {
        fetchProjectSet({ variables });
      }
    });
  };

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready && data) {
      dispatch(setProjectSet(data.projectSet));
    }
  }, [networkStatus, data]);

  const search = (searchText: string) => {
    let result = projectSet.filter((p) => p.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
    return result;
  };

  return { networkStatus, syncTable, search };
};

export default useProjectTable;
