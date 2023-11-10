import React from "react"
import { RootState } from "@src/store"
import { useSelector } from "react-redux"
import { LanguageChoiceEnum } from "@src/gql/generated"

const useIsRtl = () => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail)
  return language.toUpperCase() !== LanguageChoiceEnum.EnUs
}
export default useIsRtl
