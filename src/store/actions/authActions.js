import {AUTH_TYPES} from '../types';

export const setToken = token => ({
    type: AUTH_TYPES.SET_TOKEN,
    payload: token,
});

export const clearToken = () => ({
    type: AUTH_TYPES.CLEAR_TOKEN,
});
