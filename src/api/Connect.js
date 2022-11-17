import axios from 'axios';
import store from '../store/configureStore';

// const baseUrl = 'https://komponent-app.ru/api/';
const baseUrl = 'http://komponent-nano.ru';

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
    console.log(`${baseUrl}${params.request}`);
    try {
        const response = await axios({
            method: 'get',
            url: `${baseUrl}${params.request}`,
            headers: {
                'Authorization-Token': `FakeiRu2:${token}`,
            },
            data: params.data,
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

export const POSTRequest = async params => {
    const token = store.store && store.store.getState().auth.token;
    console.log(params.request);
    try {
        const response = await axios({
            method: 'post',
            url: `${baseUrl}${params.request}`,
            headers: {
                'Authorization-Token': `FakeiRu2:${token}`,
            },
            data: params.data,
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
