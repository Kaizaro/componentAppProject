import {getRequest, POSTRequest} from './Connect';

export const getCodeState = async code => {
    console.log('code', code);
    return await getRequest({
        request: `coupon/?code=${code}`,
    });
};

export const getScanHistory = async (page: number = 1) => {
    return await getRequest({
        request: `v2/coupons/?page=${page}`,
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

export const setRequestTonnageValue = async (code, tonnage) => {
    console.log({code, tonnage});
    return await POSTRequest({
        request: 'coupon/set-value',
        data: {
            code,
            value: tonnage,
        },
    });
};
