import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import mathReducer from 'app/reducers/math/math.slice';
import authReducer, { IAuthState } from 'app/reducers/user/auth.slice';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import { employeeAPI } from 'app/reducers/employee/employee.api';
import { animeAPI } from './anime/anime.api';
import { accountAPI } from './account/account.api';

const authPersistConfig = {
  key: 'auth',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'SUPER_SECRET_KEY',
    }),
  ],
};

const reducers = {
  [accountAPI.reducerPath]: accountAPI.reducer,
  [animeAPI.reducerPath]: animeAPI.reducer,
  [employeeAPI.reducerPath]: employeeAPI.reducer,
  math: mathReducer,
  auth: persistReducer<IAuthState>(authPersistConfig, authReducer),
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer = (state, action) => {
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'math', employeeAPI.reducerPath, animeAPI.reducerPath, accountAPI.reducerPath],
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
    }).concat(employeeAPI.middleware, animeAPI.middleware, accountAPI.middleware),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export { persistor };
export default store;
