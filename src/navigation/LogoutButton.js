import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearToken} from '../store/actions/authActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_COLORS} from '../Styles';

class LogoutButton extends PureComponent {
    onLogoutButtonPress = () => {
        this.props.authActions.clearToken();
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.75} style={styles.container} onPress={this.onLogoutButtonPress}>
                <Icon size={30} color={APP_COLORS.GRAY} name={'sign-out'} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators({clearToken}, dispatch),
});

export default connect(mapDispatchToProps)(LogoutButton);
