import { combineReducers } from "@reduxjs/toolkit";
import { fireStoreApi } from "./services/apiSlice";
import { featuresSliceReducer } from "./features/appSlice";

export const rootReducer = combineReducers({
  features: featuresSliceReducer,
  [fireStoreApi.reducerPath]: fireStoreApi.reducer,
});

