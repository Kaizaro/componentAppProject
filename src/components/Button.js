import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../lib/util';
import {APP_COLORS, APP_FONTS} from '../Styles';

class Button extends React.PureComponent {
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

    render = () => {
        const {disabled, onPress, style, text} = this.props;
        return (
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={
                    disabled
                        ? {
                              ...this.getStyle(styles.container),
                              opacity: 0.4,
                          }
                        : this.getStyle(styles.container)
                }
                activeOpacity={0.75}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: scaleHorizontal(225),
        height: scaleVertical(40),
        backgroundColor: APP_COLORS.PRIMARY_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
    text: {
        marginBottom: scaleVertical(5),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(24),
        color: 'white',
    },
});

export default Button;
