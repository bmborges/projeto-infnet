import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import { appReducer } from './appSlice';


export {Provider as AppStoreProvider} from 'react-redux';

  const persistConfig = {
    storage: AsyncStorage,
  };



  const persistedAppReducer = persistReducer(
    {
      ...persistConfig,
      key: 'app',
    },
    appReducer,
  );

export const appStore = configureStore({
    reducer: {
      app: persistedAppReducer,
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});
export const appPersistor = persistStore(appStore);  

export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export type AppStore = ReturnType<typeof appStore.getState>;