import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../lib/util';
import {APP_COLORS, APP_FONTS} from '../Styles';
import Button from './Button';
import TransparentButton from './TransparentButton';

const {width, height} = Dimensions.get('window');

export default class ChangeDataFieldInput extends Component {
    render() {
        const {
            defaultValue,
            value,
            valueChange,
            valueSubmit,
            visibleField,
            fieldClose,
        } = this.props;
        return (
            <Modal
                hardwareAccelerated={true}
                presentationStyle={'overFullScreen'}
                animationType={'slide'}
                animated={true}
                visible={visibleField}
                onRequestClose={fieldClose}>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Введите количество тонн. Вы можете добавить до 5 тонн.{'\n\n'}
                        В заявке: {parseFloat(defaultValue).toFixed(1)} т.{'\n\n'}
                        Максимальное количество: {parseFloat(parseFloat(defaultValue).toFixed(1)) + 5} т.
                    </Text>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            onChangeText={valueChange}
                            value={value}
                            autoFocus={true}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            style={styles.textInput}
                        />
                    </View>
                    <Button
                        style={styles.button}
                        text={'Подтвердить'}
                        onPress={valueSubmit}
                    />
                    <TransparentButton
                        text={'Вернуться'}
                        onPress={fieldClose}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scaleHorizontal(20),
        paddingVertical: scaleVertical(20),
        alignItems: 'center',
    },
    text: {
        fontSize: scaleHorizontal(16),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        color: APP_COLORS.DARK_GREY,
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: APP_COLORS.LIGHT_GRAY,
        marginTop: scaleVertical(15),
        paddingVertical: scaleVertical(15),
        paddingHorizontal: scaleHorizontal(10),
    },
    textInput: {
        fontSize: scaleHorizontal(16),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        color: APP_COLORS.PRIMARY_BLACK,
        textAlign: 'left',
        letterSpacing: scaleHorizontal(0.5),
    },
    button: {
        marginTop: scaleVertical(20),
    },
});
