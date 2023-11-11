import NetInfo from "@react-native-community/netinfo";
import { useMyNgoDetailLazyQuery } from "@src/gql/generated";
import { setMyNFODetail } from "@src/slice/my-ngo-slice";
import { RootState } from "@src/store";
import { useDispatch, useSelector } from "react-redux";

const useNGODTable = () => {
  const dispatch = useDispatch();
  const { myNGODetail } = useSelector((state: RootState) => state.myNGODetailSlice);
  const [_, { networkStatus, refetch }] = useMyNgoDetailLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  const syncTable = () => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected) {
        refetch().then(({ data }) => dispatch(setMyNFODetail(data.NGODetail)));
      }
    });
  };

  const get = () => myNGODetail;

  return { syncTable, networkStatus, get };
};

export default useNGODTable;
