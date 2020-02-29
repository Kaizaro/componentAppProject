import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_COLORS} from '../Styles';

export default class SettingsButton extends PureComponent {
    onSettingsButtonPress = () => {
        this.props.navigation.state.params.onChooseButtonPress();
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this.onSettingsButtonPress}
                style={styles.container}>
                <Icon size={30} color={APP_COLORS.DARK_GREY} name={'cog'} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: APP_COLORS.PRIMARY_GREEN,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
});
