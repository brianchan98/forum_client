import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
    applyMiddleware() // add any middlewares here
)

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root'))