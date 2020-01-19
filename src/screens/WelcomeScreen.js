import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../../assets/images/appLogoFull.jpg';
import {APP_COLORS} from '../Styles';
import {scaleVertical} from '../lib/util';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import {clearToken} from '../store/actions/authActions';
import {bindActionCreators} from 'redux';

export const {width, height} = Dimensions.get('window');

class WelcomeScreen extends Component {
    componentDidMount = () => {
        //TODO remove timeout
        setTimeout(() => {
            const {token} = this.props;
            if (token && token !== '') {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'AppStack',
                        }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'AuthStack',
                        }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }, 2000);
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={styles.image}
                    resizeMode={'contain'}
                />
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>Загрузка...</Text>
                    <Icon
                        style={{marginTop: 14}}
                        size={20}
                        color={APP_COLORS.LIGHT_GREEN}
                        name={'cog'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 200,
    },
    image: {
        width: 225,
        height: 150,
    },
    dataContainer: {
        marginTop: 65,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: APP_COLORS.GRAY,
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators({clearToken}, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WelcomeScreen);
