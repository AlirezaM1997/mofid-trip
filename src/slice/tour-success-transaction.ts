import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TourTransactionQueryType } from "@src/gql/generated";

export interface TransactionState {
  data: TourTransactionQueryType;
}

const initialState: TransactionState = {
  data: {} as TourTransactionQueryType,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTourTransaction: (state, action: PayloadAction<TourTransactionQueryType>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
