import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REHYDRATE,
  REGISTER,
} from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { tableDetailSlice } from "../TableDetail/tabledetail.slice";
import foodMenuSlice from "../TableDetail/foodMenu.slice";
import orderTableReducer from "../TableDetail/orderTable.slice";
// import foodMenuReducer from "../TableDetail/foodMenu.slice";
import foodMenuReducer from "../foodMenu.slice";
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage,
};

const slice = combineReducers({
  tableDetail: tableDetailSlice.reducer,
  foodMenu: foodMenuReducer,
});

const persistedReducer = persistReducer(persistConfig, slice);
// const authPersistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: persistedReducer,
  foodMenu: foodMenuReducer,
  orderTables: orderTableReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER],
      },
    }),
});
