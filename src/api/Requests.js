import {getRequest} from "./Connect";

export const getCodeState = async code => {
    return await getRequest({
        request: `coupon/?=code=${code}`,
    });
};
