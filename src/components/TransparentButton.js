import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../lib/util';
import {APP_COLORS, APP_FONTS} from '../Styles';

export default class TransparentButton extends PureComponent {
    getStyle = defaultStyle => {
        if (this.props.style) {
            const outStyle = {
                ...defaultStyle,
                ...this.props.style,
            };
            return outStyle;
        } else {
            return defaultStyle;
        }
    };

    render() {
        const {text, onPress, disabled} = this.props;
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                style={this.getStyle(styles.container)}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: scaleHorizontal(225),
        height: scaleVertical(60),
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(18),
        color: APP_COLORS.PRIMARY_GREEN,
        textDecorationLine: 'underline',
    },
});
