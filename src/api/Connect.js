import axios from 'axios';
import store from '../store/configureStore';

const baseUrl = 'https://test.moveup.pw/api/';

export const authUser = async params => {
    try {
        const {username, password} = params;
        const response = await axios({
            method: 'get',
            url: `${baseUrl}user/auth`,
            auth: {username, password},
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if (error && error.response) {
            console.log(error.response);
            return error.response;
        }
    }
};

export const getRequest = async params => {
    const token = store.store && store.store.getState().auth.token;
    console.log(params, params.request);
    try {
        const response = await axios({
            method: 'get',
            url: `${baseUrl}${params.request}`,
            'Authorization-token': `FakeiRu2:${token}`,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if (error && error.response) {
            console.log(error.response);
            return error.response;
        }
    }
};
