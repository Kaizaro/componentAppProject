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
        console.log('onItemPress');
        console.log(item);
        this.props.navigation.navigate('RequestGroup', {
            group: item,
            date,
            dataLength,
        });
    };

    filterRequestGroup = requests => {
        console.log('requestGroup', requests);
        // const arr = requests.filter(item => type === item.typeWaste);
        let arr = [];
        let type;
        requests.map(request => {
            console.log(request);
            if (arr.length === 0) {
                type = request.typeWaste;
                arr.push({
                    group: request.typeWaste,
                    data: [request],
                });
            } else {
                console.log(request.typeWaste);
                if (request.typeWaste === type) {
                    console.log('here', type, request);
                    console.log(arr);
                    const index = arr.findIndex(
                        x => x.group === request.typeWaste,
                    );
                    console.log(index);
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
        console.log('final', arr);
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
        let group = this.filterRequestGroup(item.data);
        console.log('group in renderItem', group);
        return (
            <View style={styles.blockContainer}>
                {this.renderDate(item.date, item.data.length)}
                {group.map(requestGroup => {
                    console.log('request group', requestGroup);
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
        const {requests} = this.state;
        return (
            <View style={styles.container}>
                {requests && (
                    <View
                        style={{
                            width: '100%',
                            height: '85%',
                        }}>
                        <FlatList
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
