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

export const getMonthName = month => {
    switch (month) {
        case 1:
            return 'Января';
        case 2:
            return 'Февраля';
        case 3:
            return 'Марта';
        case 4:
            return 'Апреля';
        case 5:
            return 'Мая';
        case 6:
            return 'Июня';
        case 7:
            return 'Июля';
        case 8:
            return 'Августа';
        case 9:
            return 'Сентября';
        case 10:
            return 'Октября';
        case 11:
            return 'Ноября';
        case 12:
            return 'Декабря';
        default:
            break;
    }
};
