import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  token: string;
  tokenAuth: Object;
  setupInitialDataAdded: boolean;
  passwordHasBeenSet: boolean;
}

const initialState: TokenState = {
  token: "",
  tokenAuth: {
    token: undefined,
  },
  setupInitialDataAdded: undefined,
  passwordHasBeenSet: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    setTokenAuth: (state, action: PayloadAction<any>) => {
      state.tokenAuth = action.payload;
    },
    passwordHasBeenSet: (state, action: PayloadAction<boolean>) => {
      state.passwordHasBeenSet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setTokenAuth, passwordHasBeenSet } = tokenSlice.actions;

export default tokenSlice.reducer;
