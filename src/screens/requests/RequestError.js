import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import Button from '../../components/Button';

export default class RequestError extends PureComponent {
    onBackButtonPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    ОШИБКА!{'\n'}Данная заявка не существует или была удалена.
                </Text>
                <View style={styles.footerContainer}>
                    <Button onPress={this.onBackButtonPress} text={'Назад'} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleHorizontal(20),
    },
    text: {
        marginBottom: scaleVertical(100),
        textAlign: 'center',
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(22),
        color: APP_COLORS.DARK_GREY,
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
