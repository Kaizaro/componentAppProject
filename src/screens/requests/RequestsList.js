import React, {Component} from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {getMonthName, scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import Button from '../../components/Button';
import {clearToken} from '../../store/actions/authActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getScanHistory} from '../../api/Requests';

const {width} = Dimensions.get('window');

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
            let filteredRequests = [];
            scanRequests.data.map(scanRequest => {
                console.log(scanRequest);
                console.log('filteredRequests', filteredRequests);
                if (filteredRequests.length === 0) {
                    filteredRequests.push({
                        date: this.getDate(scanRequest.dateScan),
                        data: [scanRequest],
                    });
                } else {
                    filteredRequests.map(filteredRequest => {
                        console.log(filteredRequest);
                        if (
                            filteredRequest.date ===
                            this.getDate(scanRequest.dateScan)
                        ) {
                            filteredRequest.data.push(scanRequest);
                        } else {
                            filteredRequests.push({
                                date: this.getDate(scanRequest.dateScan),
                                data: [scanRequest],
                            });
                        }
                    });
                }
            });
            console.log('in end of logic', filteredRequests);
            this.setState({requests: filteredRequests});
        }
    };

    getDate = timestamp => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = getMonthName(date.getMonth() + 1);
        const day = date.getDate();
        return `${day} ${month} ${year}`;
    };

    onItemPress = (item, date, dataLength) => {
        console.log('onItemPress');
        console.log(item);
        this.props.navigation.navigate('RequestGroup', {
            group: item,
            date,
            dataLength,
        });
    };

    filterRequestGroup = (type, requests) => {
        console.log('requestGroup', type, requests);
        let arr = [];
        requests.map(item => {
            console.log(item);
            if (type === item.typeWaste) {
                arr.push(item);
            }
        });
        console.log(arr);
        return arr;
    };

    onButtonPress = () => {
        this.props.navigation.navigate('ScanQRCodeScanner');
    };

    renderEmptyList = () => {
        console.log('EMPTY LIST');
    };

    renderItem = ({item, index}) => {
        console.log('item', item, index);
        return (
            <View style={styles.blockContainer}>
                {this.renderDate(item.date, item.data.length)}
                {item.data.map(requestGroups => {
                    console.log(requestGroups);
                    return this.renderRequestGroups(
                        requestGroups,
                        item.data,
                        item.date,
                        item.data.length,
                    );
                })}
                {/*<View style={styles.dateContainer}>*/}
                {/*    <Text style={styles.dateText}>*/}
                {/*        {this.getDate(item.dateScan)}*/}
                {/*    </Text>*/}
                {/*</View>*/}
                {/*<View style={styles.dataContainer}>*/}
                {/*    <Text style={styles.dataText}>{item.typeWaste}</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.dataCountContainer}>*/}
                {/*    {item.volume && (*/}
                {/*        <Text style={styles.dataText}>{`Объем: ${Math.round(*/}
                {/*            item.volume,*/}
                {/*        )} м3`}</Text>*/}
                {/*    )}*/}
                {/*    {item.tonnage && (*/}
                {/*        <Text style={styles.dataText}>{`Тоннаж: ${Math.round(*/}
                {/*            item.tonnage,*/}
                {/*        )} т.`}</Text>*/}
                {/*    )}*/}
                {/*</View>*/}
            </View>
        );
    };

    renderDate = (date, count) => (
        <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
                {date} - {count} шт
            </Text>
        </View>
    );

    renderRequestGroups = (requestGroup, requests, date, dataLength) => {
        console.log(requestGroup);
        let group = this.filterRequestGroup(requestGroup.typeWaste, requests);
        console.log(group);
        return (
            <TouchableOpacity
                onPress={() => this.onItemPress(group, date, dataLength)}
                style={styles.dataContainer}>
                {group && (
                    <Text style={styles.dataText}>
                        {requestGroup.typeWaste},{' '}
                        {requestGroup.tonnage
                            ? `${parseFloat(requestGroup.tonnage).toFixed(
                                  1,
                              )} т.`
                            : ''}
                        {requestGroup.volume
                            ? `, ${parseFloat(requestGroup.volume).toFixed(
                                  1,
                              )} м3.`
                            : ''}{' '}
                        - {group.length} шт.
                    </Text>
                )}
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
        width,
        flexDirection: 'column',
        paddingHorizontal: scaleHorizontal(20),
        paddingBottom: scaleVertical(20),
        // alignItems: 'center',
    },
    blockContainer: {
        width: '100%',
        paddingVertical: scaleVertical(20),
        borderBottomWidth: scaleVertical(1),
        borderColor: APP_COLORS.LIGHT_GRAY,
        // alignItems: 'center',
    },
    dateContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(18),
        color: APP_COLORS.DARK_GREY,
    },
    dataContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dataText: {
        marginTop: scaleVertical(10),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(16),
        color: APP_COLORS.PRIMARY_BLACK,
    },
    nameText: {
        color: APP_COLORS.GREY,
        fontSize: scaleHorizontal(18),
        fontWeight: 'bold',
    },
    dataCountContainer: {
        marginLeft: scaleHorizontal(10),
        paddingVertical: scaleVertical(10),
        width: '40%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: scaleVertical(20),
        alignSelf: 'center',
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
