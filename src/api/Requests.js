import {getRequest, POSTRequest} from './Connect';

export const getCodeState = async code => {
    console.log('code', code);
    return await getRequest({
        request: `coupon/?code=${code}`,
    });
};

export const getScanHistory = async () => {
    return await getRequest({
        request: 'coupon/list',
    });
};

export const setRequestStatus = async (code, status) => {
    console.log('code', code, '\nstatus', status);
    return await POSTRequest({
        request: 'coupon/set-status/',
        data: {
            code,
            status,
        },
    });
};

export const setProblem = async (code, comment) => {
    return await POSTRequest({
        request: 'coupon/set-problem',
        data: {
            code,
            comment,
        },
    });
};
