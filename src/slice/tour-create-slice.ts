import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TourAddInputType, TourGenderEnum } from "@src/gql/generated";

type initialStateType = {
  activeStep: number;
  forms: Record<number, { errors: [] }>;
};

export const initialState: initialStateType = {
  activeStep: 1,
  forms: {
    1: { errors: [] },
    2: { errors: [] },
    3: { errors: [] },
    4: { errors: [] },
    5: { errors: [] },
    6: { errors: [] },
    7: { errors: [] },
    8: { errors: [] },
  },
};

export const userSlice = createSlice({
  name: "tour-create",
  initialState,
  reducers: {
    setTourCreateActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourCreateActiveStep } = userSlice.actions;

export default userSlice.reducer;
