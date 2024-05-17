import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./rootReducer";
import { fireStoreApi } from "./services/apiSlice";
import { featuresSliceReducer } from "./features/appSlice";

// configureStore is used to create the Redux store,
// and setupListeners is called to handle refetchOnFocus and refetchOnReconnect behaviours.
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fireStoreApi.middleware),
});

setupListeners(store.dispatch);
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
