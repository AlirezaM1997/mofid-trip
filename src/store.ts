import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import tokenReducer from "./redux/slice/token";

const productionReducers = {
  token: tokenReducer,
};

const appReducer = combineReducers(productionReducers);

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
