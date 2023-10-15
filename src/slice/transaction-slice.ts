import dayjs from "dayjs"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { GuestGender, TransactionAddInputType } from "@src/gql/generated"

export interface TransactionState {
  data: TransactionAddInputType
}

export const defaultGuest = {
  name: "",
  gender: GuestGender.Male,
  birthday: dayjs().format("YYYY-MM-DD"),
  identifyNumber: "",
  identifyPicture: "",
}

const initialState: TransactionState = {
  data: {
    id: "",
    tax: "",
    price: "",
    projectId: "",
    dateStart: dayjs().format("YYYY-MM-DD"),
    dateEnd: dayjs().format("YYYY-MM-DD"),
    description: "",
    guests: [{ ...defaultGuest, id: 1 }],
  },
}

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Partial<TransactionState>>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setData } = transactionSlice.actions

export default transactionSlice.reducer
