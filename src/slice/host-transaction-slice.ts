import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectTransactionAddInputType, TransactionGuestGenderEnum } from "@src/gql/generated";

type ProjectTransactionDataWithoutId = Omit<ProjectTransactionAddInputType, "projectId">;

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
  },
};

export const userSlice = createSlice({
  name: "host-transaction",
  initialState,
  reducers: {
    setHostTransactionData: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHostTransactionData } = userSlice.actions;

export default userSlice.reducer;
