import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PageType, ProjectFilterType, ProjectPageType, ProjectQueryType } from "@src/gql/generated";
import { PAGE_SIZE } from "@src/settings";

type ProjectSetArgumentsTypes = {
  search: String;
  filter?: ProjectFilterType;
  page: PageType;
};

type initialStateType = {
  projectDetail: ProjectQueryType;
  projectSet: ProjectPageType;
  projectSetArguments: ProjectSetArgumentsTypes;
};

const initialState: initialStateType = {
  projectDetail: {
    tags: [],
  },
  projectSet: {},
  projectSetArguments: {
    search: "",
    filter: {
      categories: [],
      gender: [],
      tags: [],
    },
    page: {
      pageNumber: 1,
      pageSize: PAGE_SIZE,
    },
  },
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectDetail: (state, action: PayloadAction<Partial<ProjectQueryType>>) => {
      state.projectDetail = action.payload;
    },
    setProjectSet: (state, action: PayloadAction<Partial<ProjectPageType>>) => {
      state.projectSet = action.payload;
    },
    setProjectSetArguments: (state, action: PayloadAction<Partial<ProjectSetArgumentsTypes>>) => {
      state.projectSetArguments = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjectDetail, setProjectSet, setProjectSetArguments } = projectSlice.actions;

export default projectSlice.reducer;
