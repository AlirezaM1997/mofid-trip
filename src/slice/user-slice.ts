import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ResponseWithToken, UserDetailQuery } from "@src/gql/generated";

type initialStateType = {
  loginData: ResponseWithToken;
  userDetail: UserDetailQuery["userDetail"];
};

const initialState: initialStateType = {
  loginData: {},
  userDetail: {
    id: null,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<ResponseWithToken>) => {
      state.loginData = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    logout: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { setLoginData, setUserDetail, logout } = userSlice.actions;

export default userSlice.reducer;
