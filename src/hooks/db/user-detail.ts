import NetInfo from "@react-native-community/netinfo";
import { useUserDetailLazyQuery } from "@src/gql/generated";
import { setUserDetail } from "@src/slice/user-slice";
import { useDispatch } from "react-redux";
import { useIsAuthenticated } from "../auth";

const useUserDetailTable = () => {
  const dispatch = useDispatch();
  const [_, { networkStatus, refetch }] = useUserDetailLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  const isAuthenticated = useIsAuthenticated()

  const syncTable = () => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected && isAuthenticated) {
        refetch().then(({ data }) => dispatch(setUserDetail(data.userDetail)));
      }
    });
  };

  return { syncTable, networkStatus };
};

export default useUserDetailTable;
