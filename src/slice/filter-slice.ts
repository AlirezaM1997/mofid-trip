import { PAGE_SIZE } from "@src/settings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PageType, ProjectFilterType, SortType, TourFilterType } from "@src/gql/generated";

export enum CategoryEnum {
  TOUR = "tour",
  HOST = "host",
}

type PropsTypes = {
  page: PageType;
  search?: string;
  sort?: SortType;
  category?: CategoryEnum;
  filter?: ProjectFilterType | TourFilterType;
};

const initialState: PropsTypes = {
  search: "",
  filter: {},
  category: CategoryEnum.HOST,
  page: {
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  },
  sort: {
    descending: false,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryEnum>) => {
      state.category = action.payload;
    },
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
    clearFilter: state => {
      state.filter = {};
    },
  },
});

export const { setCategory, setFilter, setSearch, setPage, setSort, clearFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
