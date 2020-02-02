import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import {APP_COLORS, APP_FONTS} from '../../Styles';

export default class RequestGroup extends Component {
    onItemPress = item => {
        console.log('onItemPress');
        console.log(item);
        this.props.navigation.navigate('RequestDetails', {
            request: item,
        });
    };

    getHours = timestamp => {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour}:${minute}`;
    };

    renderItem = ({item, index}) => {
        const date = this.props.navigation.getParam('date');
        const dataLength = this.props.navigation.getParam('dataLength');
        console.log('item', item, index);
        return (
            <View style={styles.blockContainer}>
                {this.renderDate()}
                <TouchableOpacity
                    onPress={() => this.onItemPress(item)}
                    style={styles.dataContainer}>
                    {this.renderDate(date, dataLength)}
                    <Text style={styles.dataText}>
                        {this.getHours(item.dateScan)} {item.typeWaste},{' '}
                        {item.tonnage
                            ? `${parseFloat(item.tonnage).toFixed(1)} т.`
                            : ''}
                        {item.volume
                            ? `, ${parseFloat(item.volume).toFixed(1)} м3.`
                            : ''}
                    </Text>
                </TouchableOpacity>
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

    render() {
        const group = this.props.navigation.getParam('group');
        console.log(group);
        return (
            <View style={styles.container}>
                {group && (
                    <FlatList
                        data={group}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.renderEmptyList}
                        style={{flex: 1}}
                        bounces={false}
                        initialNumToRender={1}
                    />
                )}
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
});
