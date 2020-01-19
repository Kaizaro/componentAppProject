import {AUTH_TYPES} from '../types';

const INITIAL_STATE = {
    token: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_TYPES.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };

        case AUTH_TYPES.CLEAR_TOKEN:
            return {
                ...state,
                token: '',
            };

        default:
            return state;
    }
};

export default authReducer;
