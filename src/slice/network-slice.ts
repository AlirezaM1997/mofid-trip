import { NetInfoState } from "@react-native-community/netinfo";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  state: NetInfoState;
};

const initialState: initialStateType = {
  state: {
    isConnected: true
  },
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetworkState: (state, action: PayloadAction<NetInfoState>) => {
      state.state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNetworkState } = networkSlice.actions;

export default networkSlice.reducer;
