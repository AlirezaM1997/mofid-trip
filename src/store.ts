import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import filterSlice from "@src/slice/filter-slice";
import NavigationSlice from "@src/slice/navigation-slice";
import networkSlice from "@src/slice/network-slice";
import projectSlice from "@src/slice/project-slice";
import settingDetailSlice from "@src/slice/setting-detail-slice";
import userSlice from "@src/slice/user-slice";
import walletTransactionIdSlice from "@src/slice/wallet-transaction-slice";
import * as Updates from "expo-updates";
import { I18nManager } from "react-native";
import { persistReducer, persistStore } from "redux-persist";

export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["tourCreateSlice", "hostCreateSlice", "hostTransactionSlice", "filterSlice"],
};

const appReducer = combineReducers({
  userSlice: userSlice,
  filterSlice: filterSlice,
  networkSlice: networkSlice,
  projectSlice: projectSlice,
  navigationSlice: NavigationSlice,
  settingDetailSlice: settingDetailSlice,
  walletTransactionIdSlice: walletTransactionIdSlice,
});

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

const rootReducer: typeof appReducer = (state, action) => {
  // implemented by highest scored answer on
  // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
  if (action.type === "user/logout") {
    clearAsyncStorage();
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    setTimeout(() => {
      Updates.reloadAsync().then(r => r);
    }, 1000);
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer);
export type RootState = ReturnType<typeof store.getState>;
export let persistor = persistStore(store);
