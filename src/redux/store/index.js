import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import loginReducer from "../reducers/loginReducer";
import vehiclesReducer from "../reducers/vehiclesReducer.js";

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
  //Qui scriverai i reducer di cui hai bisogno
  vehicles: vehiclesReducer,
  login: loginReducer
});
const persistedReducer = persistReducer(persistConfig, mainReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
