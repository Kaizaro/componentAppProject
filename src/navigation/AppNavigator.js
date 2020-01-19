import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import RequestsList from '../screens/requests/RequestsList';
import RequestCreate from '../screens/requests/RequestCreate';
import {APP_COLORS} from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scaleHorizontal} from '../lib/util';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clearToken} from '../store/actions/authActions';
import ScanQRCodeScreen from '../screens/common/ScanQRCodeScreen';
import LogoutButton from './LogoutButton';
import ScreenTitle from './ScreenTitle';
import BackButton from './BackButton';

export const {width, height} = Dimensions.get('window');

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
                headerTitle: () => <ScreenTitle title={'Свалка ТЦ Филион'} />,
                headerLeft: () => <BackButton navigation={navigation} />,
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
                headerTitle: () => <ScreenTitle title={'Сканирование заявки'} />,
                headerLeft: () => <BackButton navigation={navigation} />,
                headerRight: () => <LogoutButton navigation={navigation} />,
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

class AppNavigator extends Component {
    render = () => {
        return <AppContainer />;
    };
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: 'CLEAR_TOKEN'}),
});

export default connect(mapDispatchToProps)(AppNavigator);
