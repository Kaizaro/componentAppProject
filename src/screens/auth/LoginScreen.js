import React from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Button from '../../components/Button';
import logo from '../../../assets/images/appLogoFull.png';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import TransparentButton from '../../components/TransparentButton';
import {authUser} from '../../api/Connect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToken} from '../../store/actions/authActions';

class LoginScreen extends React.Component {
    state = {
        username: '',
        password: '',
        isButtonDisabled: true,
    };

    onUsernameChange = username => {
        this.setState({username});
    };

    onPasswordChange = password => {
        this.setState({password});
    };

    isButtonDisabled = () => {
        const {username, password} = this.state;
        return !(username.length >= 3 && password.length >= 1);
    };

    onLoginButtonPress = async () => {
        console.log('button pressed');
        const {username, password} = this.state;

        const response = await authUser({
            username,
            password,
        });
        console.log(response);

        if (response && response.status === 200) {
            this.setState({username: '', password: ''});
            if (response.data && response.data.token) {
                this.props.authActions.setToken(response.data.token);
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'AppStack',
                        }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            }
        } else if (response && response.status === 401) {
            alert('Введен некорректный логин или пароль. Попробуйте еще раз.');
            this.setState({username: '', password: ''});
        }
    };

    onRegistrationButtonPress = () => {
        console.log('registration button pressed');
    };

    render = () => {
        const {username, password} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Image
                        source={logo}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                    <View style={styles.inputField}>
                        <TextInput
                            contextMenuHidden={true}
                            defaultValue={username}
                            onChangeText={this.onUsernameChange}
                            placeholder={'E-mail или телефон'}
                            placeholderTextColor={APP_COLORS.DARK_GREY}
                            returnKeyType={'done'}
                            style={styles.inputFieldText}
                        />
                    </View>
                    <View style={styles.inputField}>
                        <TextInput
                            contextMenuHidden={true}
                            defaultValue={password}
                            onChangeText={this.onPasswordChange}
                            placeholder={'Пароль'}
                            placeholderTextColor={APP_COLORS.DARK_GREY}
                            returnKeyType={'done'}
                            style={styles.inputFieldText}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        style={styles.buttonContainer}
                        onPress={this.onLoginButtonPress}
                        text={'Вход'}
                        disabled={this.isButtonDisabled()}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <TransparentButton
                        onPress={this.onRegistrationButtonPress}
                        text={'Регистрация'}
                    />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleHorizontal(30),
        paddingVertical: scaleVertical(20),
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: scaleHorizontal(225),
        height: scaleVertical(145),
    },
    inputField: {
        marginTop: scaleVertical(20),
        width: scaleHorizontal(225),
        minHeight: scaleVertical(40),
        backgroundColor: APP_COLORS.LIGHT_GRAY,
    },
    inputFieldText: {
        fontSize: scaleHorizontal(16),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        color: APP_COLORS.PRIMARY_BLACK,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: scaleVertical(20),
    },
    footerContainer: {
        height: '15%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableContainer: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: scaleHorizontal(18),
        color: APP_COLORS.PRIMARY_GREEN,
        textDecorationLine: 'underline',
    },
});

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators({setToken}, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen);
