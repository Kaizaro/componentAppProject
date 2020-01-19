import axios from 'axios';

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
