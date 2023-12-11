import { createSlice } from "@reduxjs/toolkit";
import { UserDetailQuery } from "@src/gql/generated";

type initialStateType = {
  userDetail: UserDetailQuery["userDetail"];
};

const initialState: initialStateType = {
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
    setUserDetail: (state, action) => {
      console.log("action.payload", action.payload);

      state.userDetail = action.payload;
    },
    logout: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetail, logout } = userSlice.actions;

export default userSlice.reducer;
