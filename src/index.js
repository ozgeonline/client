import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore, //Redux deposunun durumunun sürdürülmesinden ve geri yüklenmesinden bir kalıcı nesne sorumludur
  persistReducer, //Redux deposunun durumunu koruyan ve geri yükleyen
  FLUSH, //Eylem, bekleyen tüm kalıcılık eylemlerini temizlemek için kullanılır
  REHYDRATE, //Redux deposunun durumunu kalıcı durumdan yeniden canlandırmak için kullanılır
  PAUSE,
  PERSIST, //Redux mağazasının durumunu sürdürmek için kullanılır
  PURGE, //kalıcı durumu temizlemek için kullanılır.
  REGISTER, //kalıcı nesneye bir reducer a kaydetmek için kullanılır.
} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {key: "root", storage, version:1 }
const persistedReducer = persistReducer(persistConfig ,authReducer)
const store = configureStore({
  reducer: persistedReducer, //Geçerli durumu  girdi olarak alır ve yeni durumu döndürür
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck : {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
