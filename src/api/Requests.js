import {getRequest} from './Connect';

export const getCodeState = async code => {
    console.log('code', code);
    return await getRequest({
        request: `coupon/?code=${code}`,
    });
};
