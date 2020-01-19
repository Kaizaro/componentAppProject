import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import authReducer from './reducers/authReducer';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AsyncStorage} from 'react-native';

const client = axios.create({
    baseURL: 'http://test.moveup.pw/api/',
});

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
    const store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(axiosMiddleware(client))),
    );
    const persistor = persistStore(store);
    return {store, persistor};
};

export default configureStore();
