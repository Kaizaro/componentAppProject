import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS} from '../../Styles';
import Button from '../../components/Button';
import {clearToken} from '../../store/actions/authActions';
import {NavigationActions, StackActions} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class RequestsList extends Component {
    state = {
        requests: null,
    };

    componentDidMount = () => {
        console.log('here');
        this.setState({
            requests: [
                {
                    tbo: {
                        cubometers: 150,
                        weight: 501,
                    },
                    kgm: {
                        cubometers: 150,
                        weight: 501,
                    },
                    date: '22.08.2016',
                },
                {
                    tbo: {
                        cubometers: 100,
                        weight: 485,
                    },
                    kgm: {
                        cubometers: 100,
                        weight: 485,
                    },
                    date: '21.08.2016',
                },
                {
                    tbo: {
                        cubometers: 245,
                        weight: 1000,
                    },
                    kgm: {
                        cubometers: 245,
                        weight: 1000,
                    },
                    date: '20.08.2016',
                },
            ],
        });
    };

    onLogoutButtonPress = () => {
        console.log('CLEAR TOKEN');
        this.props.clearToken();
        if (this.props.token === '') {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'AuthStack',
                    }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }
    };

    onItemPress = item => {
        console.log('onItemPress');
    };

    onButtonPress = () => {
        console.log('onButtonPress');
        this.props.navigation.navigate('ScanQRCodeScanner');
    };

    renderEmptyList = () => {
        console.log('EMPTY LIST');
    };

    renderItem = ({item, index}) => {
        console.log(item, index);
        return (
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => this.onItemPress()}>
                <View style={styles.dateContainer}>
                    <Text style={styles.nameText}>ТБО</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.nameText}>КГМ</Text>
                </View>
                <View style={styles.dataRowContainer}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataText}>{`${
                            item.tbo.cubometers
                        } м3`}</Text>
                        <Text style={styles.dataText}>{`${
                            item.tbo.weight
                        } тон`}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataText}>{`${
                            item.kgm.cubometers
                        } м3`}</Text>
                        <Text style={styles.dataText}>{`${
                            item.kgm.weight
                        } тон`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const {requests} = this.state;
        return (
            <View style={styles.container}>
                {requests && (
                    <FlatList
                        data={requests}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.renderEmptyList}
                        style={{flex: 1}}
                        bounces={false}
                        initialNumToRender={1}
                    />
                )}
                <Button
                    onPress={this.onButtonPress}
                    style={styles.buttonContainer}
                    text={'Сканировать'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: scaleHorizontal(20),
        paddingBottom: scaleVertical(20),
        alignItems: 'center',
    },
    rowContainer: {
        width: '95%',
        paddingVertical: scaleVertical(30),
        flexDirection: 'column',
        borderBottomWidth: scaleVertical(1),
        borderColor: APP_COLORS.LIGHT_GRAY,
        alignItems: 'center',
    },
    dateContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: APP_COLORS.GRAY,
        fontSize: scaleHorizontal(18),
    },
    nameText: {
        color: APP_COLORS.GRAY,
        fontSize: scaleHorizontal(18),
        fontWeight: 'bold',
    },
    dataRowContainer: {
        marginTop: scaleVertical(25),
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataContainer: {
        width: '43%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataText: {
        fontSize: scaleHorizontal(16),
    },
    buttonContainer: {
        position: 'absolute',
        bottom: scaleVertical(20),
    },
});

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators({clearToken}, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestsList);
