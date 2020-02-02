import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import Button from '../../components/Button';
import {clearToken} from '../../store/actions/authActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getScanHistory} from '../../api/Requests';

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
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day}/${month}/${year}`;
    };

    onItemPress = item => {
        console.log('onItemPress');
        console.log(item);
        this.props.navigation.navigate('RequestDetails', {
            request: item,
        });
    };

    onButtonPress = () => {
        this.props.navigation.navigate('ScanQRCodeScanner');
    };

    renderEmptyList = () => {
        console.log('EMPTY LIST');
    };

    renderDate = (date, count) => (
        <View>
            <Text>
                {date}
            </Text>
            <Text>{count}</Text>
        </View>
    );

    renderItem = ({item, index}) => {
        console.log('item', item, index);
        return (
            <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => this.onItemPress(item)}>
                {this.renderDate(item.date, item.data.length)}
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
        alignSelf: 'stretch',
        paddingVertical: scaleVertical(20),
        flexDirection: 'row',
        borderBottomWidth: scaleVertical(1),
        borderColor: APP_COLORS.LIGHT_GRAY,
        alignItems: 'center',
    },
    dateContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dateText: {
        color: APP_COLORS.DARK_GREY,
        fontSize: scaleHorizontal(18),
    },
    nameText: {
        color: APP_COLORS.GREY,
        fontSize: scaleHorizontal(18),
        fontWeight: 'bold',
    },
    dataContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dataText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(16),
        color: APP_COLORS.PRIMARY_BLACK,
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
