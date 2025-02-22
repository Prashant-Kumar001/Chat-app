import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import misc from "./reducers/misc";
import api from "./api/api";

const store = configureStore({
  reducer: {
    auth: authReducer,
    misc: misc,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;