import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import { reducer } from "./reducers";
const store = configureStore({
  reducer: reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
const persistor = persistStore(store);
export { persistor, store };
