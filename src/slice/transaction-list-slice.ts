import dayjs from "dayjs"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { UserTransactionListQuery } from "@src/gql/generated"

export interface TransactionState {
  data: UserTransactionListQuery["userTransactionList"]
}

const initialState: TransactionState = {
  data: [],
}

export const transactionListSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionList: (state, action: PayloadAction<Partial<TransactionState>>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTransactionList } = transactionListSlice.actions

export default transactionListSlice.reducer
