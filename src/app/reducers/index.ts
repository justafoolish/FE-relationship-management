import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { accountAPI } from 'app/reducers/api';
import authReducer, { IAuthState } from 'app/reducers/user/auth.slice';

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
  [accountAPI.reducerPath]: accountAPI.reducer,
  auth: persistReducer<IAuthState>(authPersistConfig, authReducer),
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer = (state, action) => {
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'math', accountAPI.reducerPath],
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
    }).concat(accountAPI.middleware),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export { persistor };
export default store;
