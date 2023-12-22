import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import loginReducer from "../reducers/loginReducer";
import vehiclesReducer from "../reducers/vehiclesReducer.js";
import resultReducer from "../reducers/resultReducer.js";
import postReducers from "../reducers/postReducer.js";
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY
    })
  ]
};
const mainReducers = combineReducers({
  vehicles: vehiclesReducer,
  login: loginReducer,
  result: resultReducer,
  post: postReducers
});
const persistedReducer = persistReducer(persistConfig, mainReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
