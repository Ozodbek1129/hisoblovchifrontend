import { configureStore } from "@reduxjs/toolkit";
import { malumotApi } from "./malumotApi";
import { usersApi } from "./usersApi";

export const store = configureStore({
  reducer: {
    [malumotApi.reducerPath]: malumotApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(malumotApi.middleware, usersApi.middleware),
});
