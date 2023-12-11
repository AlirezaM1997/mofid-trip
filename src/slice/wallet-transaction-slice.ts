import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletTransactionDetailQuery } from "@src/gql/generated";

type walletTransactionId = { id: WalletTransactionDetailQuery["walletTransactionDetail"]["id"] };

export const initialState: walletTransactionId = { id: "" };

export const walletTransactionIdSlice = createSlice({
  name: "wallet-transaction-id",
  initialState,
  reducers: {
    setWalletTransactionIdData: (state, action: PayloadAction<walletTransactionId["id"]>) => {
      state.id = action.payload;
    },
  },
});

export const { setWalletTransactionIdData } = walletTransactionIdSlice.actions;

export default walletTransactionIdSlice.reducer;
