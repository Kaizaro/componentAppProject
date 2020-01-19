import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal} from '../lib/util';
import {APP_FONTS} from "../Styles";

export default class ScreenTitle extends PureComponent {
    render() {
        const {title} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(18),
    },
});
