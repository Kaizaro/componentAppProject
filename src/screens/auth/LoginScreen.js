import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    KeyboardAvoidingView,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Button from '../../components/Button';
import logo from '../../../assets/images/appLogo.png';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import {authUser} from '../../api/Connect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToken} from '../../store/actions/authActions';

//TODO
// На экране входа заменить картинку на картинку без текста, увеличиваем картинку. Элементы распределить, чтобы был занят экран.
// Сделать "Компонент" и "Система учета" текстом.
// Сделать маску на номер телефон в формате +7 999 123-45-67
// Добавить letterspacing.

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

    render = () => {
        const {username, password} = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={'padding'}
                    enabled={true}
                    style={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={logo}
                            resizeMode={'contain'}
                            style={styles.image}
                        />
                        <Text style={styles.logoTitleText}>Компонент</Text>
                        <Text style={styles.logoSloganText}>Система учета</Text>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputField}>
                            <TextInput
                                contextMenuHidden={true}
                                defaultValue={username}
                                onChangeText={this.onUsernameChange}
                                placeholder={'Логин'}
                                placeholderTextColor={APP_COLORS.DARK_GREY}
                                keyboardType={'phone-pad'}
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
                </KeyboardAvoidingView>
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
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: scaleHorizontal(30),
        paddingVertical: scaleVertical(20),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    logoTitleText: {
        marginTop: scaleVertical(15),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(42),
        color: APP_COLORS.PRIMARY_GREEN,
    },
    logoSloganText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(30),
        color: APP_COLORS.PRIMARY_BLACK,
    },
    image: {
        width: scaleHorizontal(225),
        height: scaleVertical(225),
    },
    inputFieldContainer: {
        marginTop: scaleVertical(20),
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
        marginTop: scaleVertical(30),
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
