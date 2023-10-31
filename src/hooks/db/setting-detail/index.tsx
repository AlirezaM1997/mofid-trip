import * as Updates from "expo-updates"
import { useDispatch } from "react-redux"
import { NetworkStatus } from "@apollo/client"
import { I18nManager, Platform } from "react-native"
import NetInfo from "@react-native-community/netinfo"
import { setSettingDetail } from "@src/slice/setting-detail-slice"
import { Exact, LanguageChoiceEnum, useSettingDetailLazyQuery } from "@src/gql/generated"

const useSettingDetail = () => {
  const dispatch = useDispatch()
  const [_, { refetch, loading, data, networkStatus }] = useSettingDetailLazyQuery({ notifyOnNetworkStatusChange: true })

  const syncTable = (variables?: Partial<Exact<{ userId?: string }>>) => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected) {
        refetch(variables).then(({ networkStatus, data }) => {
          if (networkStatus === NetworkStatus.ready && data) {
            dispatch(setSettingDetail(data.settingDetail))
            const shouldBeRtl = [LanguageChoiceEnum.FaIr, LanguageChoiceEnum.Ar].includes(data.settingDetail.language)
            if (Platform.OS === "web") {
              window.location.href = ""
            } else {
              I18nManager.allowRTL(shouldBeRtl)
              I18nManager.forceRTL(shouldBeRtl)
              setTimeout(() => {
                Updates.reloadAsync().then((r) => r)
              }, 0)
            }
          }
        })
      }
    })
  }

  return { syncTable, networkStatus }
}

export default useSettingDetail
