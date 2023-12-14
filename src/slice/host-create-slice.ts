import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  activeStep: number;
};

export const initialState: initialStateType = {
  activeStep: 1,
};

export const userSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setHostCreateActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHostCreateActiveStep } = userSlice.actions;

export default userSlice.reducer;
