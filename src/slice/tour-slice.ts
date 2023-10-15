import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TourTypes } from "@src/gql/generated";

type initialStateType = {
  tourDetail: TourTypes;
};

const initialState: initialStateType = {
  tourDetail: {
    price: [],
  },
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTourDetail: (state, action: PayloadAction<Partial<TourTypes>>) => {
      state.tourDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourDetail } = tourSlice.actions;

export default tourSlice.reducer;
