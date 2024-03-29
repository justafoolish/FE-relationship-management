import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { accountAPI, appointmentAPI, notificationAPI, relationshipAPI, tagAPI } from 'app/reducers/api';
import authReducer, { IAuthState } from 'app/reducers/user/auth.slice';
import dialogReducer from 'app/reducers/dialog/dialog.slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['user'],
  transforms: [
    encryptTransform({
      secretKey: 'SUPER_SECRET_KEY',
    }),
  ],
};

const reducers = {
  [tagAPI.reducerPath]: tagAPI.reducer,
  [accountAPI.reducerPath]: accountAPI.reducer,
  [appointmentAPI.reducerPath]: appointmentAPI.reducer,
  [relationshipAPI.reducerPath]: relationshipAPI.reducer,
  [notificationAPI.reducerPath]: notificationAPI.reducer,
  dialog: dialogReducer,
  auth: persistReducer<IAuthState>(authPersistConfig, authReducer),
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer = (state, action) => {
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'auth',
    'dialog',
    tagAPI.reducerPath,
    accountAPI.reducerPath,
    appointmentAPI.reducerPath,
    relationshipAPI.reducerPath,
    notificationAPI.reducerPath,
  ],
  transforms: [
    encryptTransform({
      secretKey: 'ROOT_PRIVATEKEY',
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      tagAPI.middleware,
      accountAPI.middleware,
      appointmentAPI.middleware,
      notificationAPI.middleware,
      relationshipAPI.middleware
    ),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export { persistor };
export default store;
