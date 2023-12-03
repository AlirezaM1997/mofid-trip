import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectTransactionAddInputType, TransactionGuestGenderEnum } from "@src/gql/generated";

type ProjectTransactionDataWithoutId = Omit<ProjectTransactionAddInputType, "projectId">;

type initialStateType = {
  data: ProjectTransactionDataWithoutId;
};

export const initialState: initialStateType = {
  data: {
    guests: {
      guestNumber: 0,
      childAccept: false,
      gender: TransactionGuestGenderEnum.Both,
    },
    dateEnd: null,
    dateStart: null,
  },
};

export const userSlice = createSlice({
  name: "host-transaction",
  initialState,
  reducers: {
    setHostTransactionData: (state, action: PayloadAction<ProjectTransactionDataWithoutId>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHostTransactionData } = userSlice.actions;

export default userSlice.reducer;
