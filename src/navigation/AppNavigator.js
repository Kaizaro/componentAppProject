import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RequestsList from '../screens/requests/RequestsList';
import RequestCreate from '../screens/requests/RequestCreate';
import ScanQRCodeScreen from '../screens/common/ScanQRCodeScreen';
import LogoutButton from './LogoutButton';
import ScreenTitle from './ScreenTitle';
import BackButton from './BackButton';
import RequestError from '../screens/requests/RequestError';

const AuthStack = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'LoginScreen',
    },
);

const AppStack = createStackNavigator(
    {
        RequestsList: {
            screen: RequestsList,
            navigationOptions: ({navigation}) => ({
                headerTitleContainerStyle: {
                    width: '73%',
                },
                headerLeftContainerStyle: {
                    width: '20%',
                },
                headerRightContainerStyle: {
                    width: '20%',
                },
                headerTitle: () => (
                    <ScreenTitle title={'История сканирований'} />
                ),
                headerLeft: () => null,
                headerRight: () => <LogoutButton navigation={navigation} />,
            }),
        },
        RequestCreate: {
            screen: RequestCreate,
            navigationOptions: ({navigation}) => ({
                headerTitleContainerStyle: {
                    width: '73%',
                },
                headerLeftContainerStyle: {
                    width: '20%',
                },
                headerRightContainerStyle: {
                    width: '20%',
                },
                headerTitle: () => <ScreenTitle title={'Просмотр заявки'} />,
                headerLeft: () => <BackButton navigation={navigation} />,
                headerRight: () => <LogoutButton navigation={navigation} />,
            }),
        },
        ScanQRCodeScanner: {
            screen: ScanQRCodeScreen,
            navigationOptions: ({navigation}) => ({
                headerTitleContainerStyle: {
                    width: '73%',
                },
                headerLeftContainerStyle: {
                    width: '20%',
                },
                headerRightContainerStyle: {
                    width: '20%',
                },
                headerTitle: () => (
                    <ScreenTitle title={'Сканирование заявки'} />
                ),
                headerLeft: () => <BackButton navigation={navigation} />,
                headerRight: () => <LogoutButton navigation={navigation} />,
            }),
        },
        RequestError: {
            screen: RequestError,
            navigationOptions: ({navigation}) => ({
                headerTitleContainerStyle: {
                    width: '73%',
                },
                headerLeftContainerStyle: {
                    width: '20%',
                },
                headerRightContainerStyle: {
                    width: '20%',
                },
                headerTitle: () => <ScreenTitle title={'Ошибка'} />,
                headerLeft: () => <BackButton navigation={navigation} />,
                headerRight: () => null,
            }),
        },
    },
    {
        initialRouteName: 'RequestsList',
    },
);

const RootStack = createStackNavigator(
    {
        WelcomeScreen: WelcomeScreen,
        AuthStack: AuthStack,
        AppStack: AppStack,
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
        initialRouteName: 'WelcomeScreen',
    },
);

const AppContainer = createAppContainer(RootStack);

export default class AppNavigator extends Component {
    render = () => {
        return <AppContainer />;
    };
}
