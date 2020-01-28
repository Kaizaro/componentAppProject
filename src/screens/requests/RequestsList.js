import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS} from '../../Styles';
import Button from '../../components/Button';
import {clearToken} from '../../store/actions/authActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getScanHistory} from '../../api/Requests';
const moment = require('moment');

class RequestsList extends Component {
    state = {
        requests: null,
    };

    componentDidMount = async () => {
        console.log('here');
        const scanRequests = await getScanHistory();
        console.log(scanRequests);
        if (
            scanRequests &&
            scanRequests.status &&
            scanRequests.status === 200 &&
            scanRequests.data
        ) {
            this.setState({requests: scanRequests.data}, () =>
                this.sortRequestsByData(),
            );
        }
        // this.setState({
        //     requests: [
        //         {
        //             tbo: {
        //                 cubometers: 150,
        //                 weight: 501,
        //             },
        //             kgm: {
        //                 cubometers: 150,
        //                 weight: 501,
        //             },
        //             date: '22.08.2016',
        //         },
        //         {
        //             tbo: {
        //                 cubometers: 100,
        //                 weight: 485,
        //             },
        //             kgm: {
        //                 cubometers: 100,
        //                 weight: 485,
        //             },
        //             date: '21.08.2016',
        //         },
        //         {
        //             tbo: {
        //                 cubometers: 245,
        //                 weight: 1000,
        //             },
        //             kgm: {
        //                 cubometers: 245,
        //                 weight: 1000,
        //             },
        //             date: '20.08.2016',
        //         },
        //     ],
        // });
    };

    sortRequestsByData = () => {
        const {requests} = this.state;
        console.log(requests);
        requests.filter();
    };

    getDate = timestamp => {
        console.log(timestamp);
        const date = new Date(timestamp * 1000);
        console.log(date);
        const year = date.getFullYear();
        const month = this.getMonth(date.getMonth() + 1);
        const day = date.getDate();
        console.log({year, month, day});
        return `${day} ${month} ${year}`;
    };

    getMonth = month => {
        switch (month) {
            case 1:
                return 'января';
            case 2:
                return 'февраля';
            case 3:
                return 'марта';
            case 4:
                return 'апреля';
            case 5:
                return 'мая';
            case 6:
                return 'июня';
            case 7:
                return 'июля';
            case 8:
                return 'августа';
            case 9:
                return 'сентября';
            case 10:
                return 'октября';
            case 11:
                return 'ноября';
            case 12:
                return 'декабря';
            default:
                break;
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

    renderDayScanRequests = ({item, index}) => {
        console.log(item, index);
        return (
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => this.onItemPress()}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        {this.getDate(item.dateScan)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderItem = ({item, index}) => {
        console.log(item, index);
        return (
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => this.onItemPress()}>
                {/*<View style={styles.dateContainer}>*/}
                {/*    <Text style={styles.dateText}>*/}
                {/*        {this.getDate(item.dateScan)}*/}
                {/*    </Text>*/}
                {/*</View>*/}
                <View style={styles.dataRowContainer}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataText}>{item.typeWaste}</Text>
                        {item.volume && (
                            <Text style={styles.dataText}>{`${
                                item.volume
                            } м3`}</Text>
                        )}
                        {item.tonnage && (
                            <Text style={styles.dataText}>{`${
                                item.tonnage
                            } т.`}</Text>
                        )}
                    </View>
                    {/*<View style={styles.dataContainer}>*/}
                    {/*    <Text style={styles.dataText}>{`${*/}
                    {/*        item.kgm.cubometers*/}
                    {/*    } м3`}</Text>*/}
                    {/*    <Text style={styles.dataText}>{`${*/}
                    {/*        item.kgm.weight*/}
                    {/*    } тон`}</Text>*/}
                    {/*</View>*/}
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: APP_COLORS.GREY,
        fontSize: scaleHorizontal(18),
    },
    nameText: {
        color: APP_COLORS.GREY,
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
