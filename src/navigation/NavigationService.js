import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function reset(routeName, params = {}) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: routeName,
                params,
            }),
        ],
    });
    _navigator.dispatch(resetAction);
}

export default {reset};
