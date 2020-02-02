import React, {Component} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {width} from '../WelcomeScreen';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';
import {getCodeState} from '../../api/Requests';

export default class ScanQRCodeScreen extends Component {
    state = {
        code: '',
        isScannerActive: true,
    };

    readQRCodeSuccess = codeData => {
        console.log('SUCCESS');
        console.log(codeData);
        if (codeData && codeData.type === 'QR_CODE') {
            const code = codeData.data;
            if (code && code.length !== 0) {
                this.setState({code});
                this.onSendCodeButtonPress(code);
            }
        }
    };

    onCodeChange = code => {
        this.setState({code});
    };

    onInputButtonPress = () => {
        const {isScannerActive} = this.state;
        if (isScannerActive) {
            this.setState({isScannerActive: false});
        } else {
            this.setState({isScannerActive: true});
        }
    };

    onSendCodeButtonPress = async code => {
        console.log(code);
        const codeState = await getCodeState(code);
        console.log(codeState);
        if (codeState && codeState.status && codeState.status === 200) {
            console.log('success check');
            if (codeState.data) {
                console.log('data !== false');
                this.props.navigation.navigate('RequestCreate', {
                    request: codeState.data,
                    code,
                    tonnage: codeState.data.tonnage,
                });
            } else {
                this.props.navigation.navigate('RequestError');
            }
        }
    };

    isButtonDisabled = () => {
        const {code} = this.state;
        return !(code.length > 0);
    };

    renderQRCodeScanner = () => (
        <QRCodeScanner
            onRead={this.readQRCodeSuccess}
            reactivate={true}
            reactivateTimeout={5000}
            cameraStyle={styles.cameraContainer}
            showMarker={true}
        />
    );

    renderInputCodeField = () => (
        <View style={styles.inputFieldContainer}>
            <Text style={styles.text}>Введите код</Text>
            <View style={styles.inputField}>
                <TextInput
                    contextMenuHidden={true}
                    defaultValue={this.state.code}
                    onChangeText={this.onCodeChange}
                    returnKeyType={'done'}
                    style={styles.inputFieldText}
                />
            </View>
            <Button
                style={styles.buttonContainer}
                onPress={() => this.onSendCodeButtonPress(this.state.code)}
                text={'Отправить код'}
                disabled={this.isButtonDisabled()}
            />
        </View>
    );

    render() {
        const {isScannerActive} = this.state;
        console.log(this.state.code);
        return (
            <View style={styles.container}>
                {isScannerActive && (
                    <View>
                        <View style={styles.cameraContainer}>
                            {this.renderQRCodeScanner()}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                Поднесите сканируемый QR-код к квадрату, для
                                завершения идентификации заявки
                            </Text>
                        </View>
                    </View>
                )}
                {!isScannerActive && this.renderInputCodeField()}
                <View style={styles.footerContainer}>
                    <TransparentButton
                        onPress={this.onInputButtonPress}
                        text={
                            isScannerActive
                                ? 'Ввести вручную'
                                : 'Сканировать QR код'
                        }
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cameraContainer: {
        width: width,
        height: scaleVertical(408),
    },
    textContainer: {
        backgroundColor: 'white',
        paddingHorizontal: scaleHorizontal(50),
        paddingTop: scaleVertical(30),
    },
    text: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(18),
        color: APP_COLORS.DARK_GREY,
        textAlign: 'center',
    },
    inputFieldContainer: {
        flex: 1,
        width: '100%',
        paddingVertical: scaleVertical(70),
        paddingHorizontal: scaleHorizontal(25),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputField: {
        marginTop: scaleVertical(20),
        width: scaleHorizontal(225),
        minHeight: scaleVertical(40),
        backgroundColor: APP_COLORS.LIGHT_GRAY,
    },
    inputFieldText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(16),
        color: APP_COLORS.PRIMARY_BLACK,
        textAlign: 'center',
        letterSpacing: scaleHorizontal(0.5),
    },
    buttonContainer: {
        marginTop: scaleVertical(20),
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        height: '15%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
