import {width, height} from '../screens/WelcomeScreen';

export const scaleHorizontal = inWidth => {
    const idealWidth = 375;
    const delimiter = idealWidth / inWidth;
    const outWidth = width / delimiter;
    return outWidth;
};

export const scaleVertical = inHeight => {
    const idealHeight = 667;
    const delimiter = idealHeight / inHeight;
    const outHeight = height / delimiter;
    return outHeight;
};
