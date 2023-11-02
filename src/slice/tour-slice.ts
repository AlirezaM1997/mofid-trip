import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TourListType, TourQueryType } from "@src/gql/generated";

type initialStateType = {
  tourDetail: TourQueryType;
  tourList: TourListType;
};

const initialState: initialStateType = {
  tourDetail: {},
  tourList: { data: [] },
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTourDetail: (state, action: PayloadAction<Partial<TourQueryType>>) => {
      state.tourDetail = action.payload;
    },
    setTourList: (state, action: PayloadAction<Partial<TourListType>>) => {
      state.tourList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourDetail, setTourList } = tourSlice.actions;

export default tourSlice.reducer;
