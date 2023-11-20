import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ResponseWithToken } from "@src/gql/generated";

type initialStateType = {
  loginData: ResponseWithToken;
  isAuthenticated: boolean;
};

const initialState: initialStateType = {
  loginData: {
    token: ''
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<ResponseWithToken>) => {
      state.loginData = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { setLoginData, setIsAuthenticated, logout } = userSlice.actions;

export default userSlice.reducer;
