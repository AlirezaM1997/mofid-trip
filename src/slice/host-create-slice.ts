import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectAddInputType, ProjectGenderEnum } from "@src/gql/generated";

type initialStateType = {
  data: ProjectAddInputType;
};

export const initialState: initialStateType = {
  data: {
    name: null,
    description: null,
    dateStart: null,
    dateEnd: null,
    accommodation: {
      province: null,
      city: null,
      address: null,
      lat: null,
      lng: null,
      base64Images: null,
    },
    capacity: {
      capacityNumber: null,
      gender: ProjectGenderEnum.Both,
      childAccept: false,
    },
    price: null,
    discount: null,
    base64Images: null,
    categories: [],
    facilities: [],
  },
};

export const userSlice = createSlice({
  name: "host-create",
  initialState,
  reducers: {
    setHostCreateData: (state, action: PayloadAction<ProjectAddInputType>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHostCreateData } = userSlice.actions;

export default userSlice.reducer;
