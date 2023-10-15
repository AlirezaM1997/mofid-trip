import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { SettingDetailQuery, SettingLanguage } from "@src/gql/generated"

type initialStateType = {
  settingDetail: SettingDetailQuery["settingDetail"]
}

const initialState: initialStateType = {
  settingDetail: {
    language: SettingLanguage.EnUs,
  },
}

export const settingDetailSlice = createSlice({
  name: "setting-detail",
  initialState,
  reducers: {
    setSettingDetail: (state, action: PayloadAction<SettingDetailQuery["settingDetail"]>) => {
      state.settingDetail = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSettingDetail } = settingDetailSlice.actions

export default settingDetailSlice.reducer
