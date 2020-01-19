import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal} from '../lib/util';

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
        fontSize: scaleHorizontal(18),
    },
});
