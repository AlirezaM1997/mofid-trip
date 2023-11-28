import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectTransactionAddInputType, TourGenderEnum } from "@src/gql/generated";

type initialStateType = {
  data: ProjectTransactionAddInputType;
};

export const initialState: initialStateType = {
  data: {
    projectId: null,
    capacity: {
      capacityNumber: 0,
      gender: TourGenderEnum.Both,
      childAccept: false,
    },
    endTime: null,
    startTime: null,
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
