import { PAGE_SIZE } from "@src/settings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PageType, ProjectFilterType, SortType } from "@src/gql/generated";

type PropsTypes = {
  page: PageType;
  search?: string;
  sort?: SortType;
  filter?: ProjectFilterType;
};

const initialState: PropsTypes = {
  search: "",
  page: {
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  },
  filter: {},
  sort: {
    descending: false,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<PropsTypes["filter"]>) => {
      state.filter = action.payload;
    },
    setSearch: (state, action: PayloadAction<PropsTypes["search"]>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<PropsTypes["page"]>) => {
      state.page = action.payload;
    },
    setSort: (state, action: PayloadAction<PropsTypes["sort"]>) => {
      state.sort = action.payload;
    },
    clearFilter: () => initialState,
  },
});

export const { setFilter, setSearch, setPage, setSort, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
