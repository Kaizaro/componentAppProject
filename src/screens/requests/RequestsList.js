import React, {Component} from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
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
import TransparentButton from '../../components/TransparentButton';

const {width} = Dimensions.get('window');

class RequestsList extends Component {
    flatlist;
    state = {
        requests: null,
        requestDates: null,
        showRequestDateWindow: false,
    };

    componentDidMount = async () => {
        const scanRequests = await getScanHistory();
        if (
            scanRequests &&
            scanRequests.status &&
            scanRequests.status === 200 &&
            scanRequests.data
        ) {
            let date;
            let filteredRequests = [];
            scanRequests.data.sort((a, b) => {
                return b.dateScan - a.dateScan;
            });
            scanRequests.data.map(scanRequest => {
                if (filteredRequests.length === 0) {
                    date = this.getDate(scanRequest.dateScan);
                    filteredRequests.push({
                        date: this.getDate(scanRequest.dateScan),
                        data: [scanRequest],
                    });
                } else {
                    if (this.getDate(scanRequest.dateScan) === date) {
                        const index = filteredRequests.findIndex(
                            x => x.date === this.getDate(scanRequest.dateScan),
                        );
                        if (index !== -1) {
                            filteredRequests[index].data.push(scanRequest);
                        }
                    } else {
                        date = this.getDate(scanRequest.dateScan);
                        filteredRequests.push({
                            date: this.getDate(scanRequest.dateScan),
                            data: [scanRequest],
                        });
                    }
                }
            });
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
        this.props.navigation.navigate('RequestGroup', {
            group: item,
            date,
            dataLength,
        });
    };

    filterRequestGroup = requests => {
        let arr = [];
        let type;
        requests.map(request => {
            if (arr.length === 0) {
                type = request.typeWaste;
                arr.push({
                    group: request.typeWaste,
                    data: [request],
                });
            } else {
                if (request.typeWaste === type) {
                    const index = arr.findIndex(
                        x => x.group === request.typeWaste,
                    );
                    if (index !== -1) {
                        arr[index].data.push(request);
                    }
                } else {
                    type = request.typeWaste;
                    arr.push({
                        group: request.typeWaste,
                        data: [request],
                    });
                }
            }
        });
        return arr;
    };

    onScanButtonPress = () => {
        this.props.navigation.navigate('ScanQRCodeScanner');
    };

    onChooseDateButtonPress = () => {
        const {requests} = this.state;
        console.log(requests);
        let requestDates = [];
        requests.map(request => {
            console.log(request);
            requestDates.push(request.date);
        });
        console.log(requestDates);
        this.setState({
            requestDates,
            showRequestDateWindow: true,
        });
    };

    onDateInDateListPress = date => {
        console.log(date);
        console.log(this.flatlist);
        const index = this.state.requests.findIndex(x => x.date === date);
        console.log(index);
        if (index !== -1) {
            this.setState({showRequestDateWindow: false}, () =>
                this.flatlist.scrollToIndex({index}),
            );
        }
    };

    renderDateList = () => (
        <View style={styles.backgroundContainer}>
            <View style={styles.dateListContainer}>
                <Text style={styles.nameText}>Выберите дату</Text>
                {this.state.requestDates && (
                    <ScrollView>
                        {this.state.requestDates.map(requestDate => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        this.onDateInDateListPress(requestDate)
                                    }
                                    style={styles.dataContainer}>
                                    <Text style={styles.dateText}>
                                        {requestDate}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        </View>
    );

    renderEmptyList = () => (
        <View>
            <Text>Список заказов пуст</Text>
        </View>
    );

    renderItem = ({item, index}) => {
        let group = this.filterRequestGroup(item.data);
        return (
            <View style={styles.blockContainer}>
                {this.renderDate(item.date, item.data.length)}
                {group.map(requestGroup => {
                    return this.renderRequestGroups(
                        requestGroup.group,
                        requestGroup.data.length,
                        requestGroup.data,
                        item.date,
                    );
                })}
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

    renderRequestGroups = (group, amount, data, date) => (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => this.onItemPress(data, date, amount)}
            style={styles.dataContainer}>
            {group && (
                <Text style={styles.dataText}>
                    {group} - {amount} шт.
                </Text>
            )}
        </TouchableOpacity>
    );

    render() {
        const {requests, showRequestDateWindow} = this.state;
        return (
            <View style={styles.container}>
                {requests && (
                    <View
                        style={{
                            width: '100%',
                            height: '75%',
                        }}>
                        <FlatList
                            ref={c => (this.flatlist = c)}
                            keyExtractor={key => key.date}
                            data={requests}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmptyList}
                            style={{flex: 1}}
                            bounces={false}
                            initialNumToRender={1}
                        />
                    </View>
                )}
                {showRequestDateWindow && this.renderDateList()}
                {!showRequestDateWindow && (
                    <View style={styles.footerContainer}>
                        <Button
                            onPress={this.onScanButtonPress}
                            text={'Сканировать'}
                        />
                        <TransparentButton
                            onPress={this.onChooseDateButtonPress}
                            style={styles.transparentButton}
                            text={'Выбрать дату'}
                        />
                    </View>
                )}
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
        paddingVertical: scaleVertical(5),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dataText: {
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
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        height: '15%',
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transparentButton: {
        marginBottom: scaleVertical(40),
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#32323290',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleHorizontal(30),
        paddingVertical: scaleVertical(30),
    },
    dateListContainer: {
        width: '100%',
        paddingHorizontal: scaleHorizontal(30),
        paddingVertical: scaleVertical(30),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    // buttonContainer: {
    //     position: 'absolute',
    //     bottom: scaleVertical(20),
    //     alignSelf: 'center',
    // },
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
