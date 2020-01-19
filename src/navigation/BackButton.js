import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_COLORS} from '../Styles';

export default class LogoutButton extends PureComponent {
    onBackButtonPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this.onBackButtonPress}
                style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon size={28} color={'white'} name={'caret-left'} />
                </View>
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
