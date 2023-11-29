import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TourAddInputType, TourGenderEnum } from "@src/gql/generated";

type initialStateType = {
  data: TourAddInputType;
};

export const initialState: initialStateType = {
  data: {
    title: null,
    description: null,
    capacity: {
      capacityNumber: 0,
      gender: TourGenderEnum.Both,
      childAccept: false,
    },
    origin: {
      address: "",
      lat: null,
      lng: null,
    },
    destination: {
      address: "",
      lat: null,
      lng: null,
      province: "",
      city: "",
    },
    startTime: null,
    endTime: null,
    price: 0,
    discount: 0,
    base64Images: [],
    facilities: [],
  },
};

export const userSlice = createSlice({
  name: "tour-create",
  initialState,
  reducers: {
    setTourCreateData: (state, action: PayloadAction<TourAddInputType>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTourCreateData } = userSlice.actions;

export default userSlice.reducer;
