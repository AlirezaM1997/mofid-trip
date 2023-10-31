import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TourPageType, TourQueryType } from "@src/gql/generated";

type initialStateType = {
  tourDetail: TourQueryType;
  tourList: TourPageType;
};

const initialState: initialStateType = {
  tourList: {},
  tourDetail: {},
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTourDetail: (state, action: PayloadAction<Partial<TourQueryType>>) => {
      state.tourDetail = action.payload;
    },
    setTourList: (state, action: PayloadAction<Partial<TourPageType>>) => {
      state.tourList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourDetail } = tourSlice.actions;

export default tourSlice.reducer;
