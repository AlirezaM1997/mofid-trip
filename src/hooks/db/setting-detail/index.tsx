import * as Updates from "expo-updates";
import { useDispatch, useSelector } from "react-redux";
import { NetworkStatus } from "@apollo/client";
import { I18nManager, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { setSettingDetail } from "@src/slice/setting-detail-slice";
import { Exact, LanguageChoiceEnum, useSettingDetailLazyQuery } from "@src/gql/generated";
import { RootState } from "@src/store";
import { useIsAuthenticated } from "@src/hooks/auth";

const useSettingDetailTable = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);
  const [_, { refetch, loading, data, networkStatus }] = useSettingDetailLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  const isAuthenticated = useIsAuthenticated()

  const syncTable = (variables?: Partial<Exact<{ userId?: string }>>) => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected && isAuthenticated) {
        refetch(variables).then(({ networkStatus, data }) => {
          if (networkStatus === NetworkStatus.ready && data) {
            const languageHasBeenChanges = data.settingDetail.language !== language;
            dispatch(setSettingDetail(data.settingDetail));
            if (languageHasBeenChanges) {
              const shouldBeRtl = [LanguageChoiceEnum.FaIr, LanguageChoiceEnum.Ar].includes(
                data.settingDetail.language
              );
              if (Platform.OS === "web") {
                // reload on web required to load proper fonts
                window.location.href = "";
              } else {
                I18nManager.allowRTL(shouldBeRtl);
                I18nManager.forceRTL(shouldBeRtl);
                setTimeout(() => {
                  Updates.reloadAsync().then(r => r);
                }, 0);
              }
            }
          }
        });
      }
    });
  };

  return { syncTable, networkStatus };
};

export default useSettingDetailTable;
