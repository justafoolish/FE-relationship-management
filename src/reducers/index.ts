import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import mathReducer, { IMathState } from 'reducers/math/math.slice';

const mathPersistConfig = {
  key: 'math',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'SUPER_SECRET_KEY',
    }),
  ],
};

const reducers = {
  math: persistReducer<IMathState>(mathPersistConfig, mathReducer),
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer = (state, action) => {
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'PRIVATEKEY',
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export { persistor };
export default store;
