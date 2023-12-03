import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ProjectGenderEnum,
  ProjectTransactionAddInputType,
  TourGenderEnum,
} from "@src/gql/generated";

type initialStateType = {
  data: ProjectTransactionAddInputType;
};

export const initialState: initialStateType = {
  data: {
    projectId: null,
    guests: {
      guestNumber: 0,
      gender: ProjectGenderEnum.Both,
      childAccept: false,
    },
    dateEnd: null,
    dateStart: null,
  },
};

export const userSlice = createSlice({
  name: "host-transaction",
  initialState,
  reducers: {
    setHostTransactionData: (state, action: PayloadAction<ProjectTransactionAddInputType>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHostTransactionData } = userSlice.actions;

export default userSlice.reducer;
