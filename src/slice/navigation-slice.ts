import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  redirectToScreenAfterLogin: string;
};

const initialState: initialStateType = {
  redirectToScreenAfterLogin: "",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setRedirectToScreenAfterLogin: (state, action) => {
      state.redirectToScreenAfterLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRedirectToScreenAfterLogin } = navigationSlice.actions;

export default navigationSlice.reducer;
