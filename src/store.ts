import transactionListSlice from "./slice/transaction-list-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import tourTransactionSlice from "@src/slice/tour-success-transaction";
import projectSlice from "@src/slice/project-slice";
import tourSlice from "@src/slice/tour-slice";
import userSlice from "@src/slice/user-slice";
import networkSlice from "@src/slice/network-slice";
import NavigationSlice from "@src/slice/navigation-slice";
import settingDetailSlice from "@src/slice/setting-detail-slice";
import myNGODetailSlice from "@src/slice/my-ngo-slice";
import * as Updates from "expo-updates";
import { I18nManager } from "react-native";

export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  userSlice: userSlice,
  tourTransactionSlice: tourTransactionSlice,
  transactionListSlice: transactionListSlice,
  projectSlice: projectSlice,
  tourSlice: tourSlice,
  networkSlice: networkSlice,
  navigationSlice: NavigationSlice,
  settingDetailSlice: settingDetailSlice,
  myNGODetailSlice: myNGODetailSlice,
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
