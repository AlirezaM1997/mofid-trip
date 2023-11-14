import { createSlice } from "@reduxjs/toolkit";
import { MyNgoDetailQuery } from "@src/gql/generated";

type initialStateType = {
  myNGODetail: MyNgoDetailQuery["NGODetail"];
};

const initialState: initialStateType = {
  myNGODetail: null,
};

export const NGOTourSlice = createSlice({
  name: "NGOTour",
  initialState,
  reducers: {
    setMyNFODetail: (state, action) => {
      state.myNGODetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMyNFODetail } = NGOTourSlice.actions;

export default NGOTourSlice.reducer;
