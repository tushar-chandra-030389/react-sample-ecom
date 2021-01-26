import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [
    // logger,
];


const isDevelopment = process.env.NODE_ENV === 'development'; 

const composeEnhancers = isDevelopment ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);

if (isDevelopment) {
    window.$store = store;
}

export default { store, persistor };
