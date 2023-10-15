import React from "react"
import { RootState } from "@src/store"
import { useSelector } from "react-redux"
import { Language_Choice } from "@src/gql/generated"

const useIsRtl = () => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail)
  return language.toUpperCase() !== Language_Choice.EnUs
}
export default useIsRtl
