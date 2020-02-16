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
        console.log('item', item, index);
        return (
            <View style={styles.blockContainer}>
                <TouchableOpacity
                    onPress={() => this.onItemPress(item)}
                    style={styles.dataContainer}>
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
        const date = this.props.navigation.getParam('date');
        const dataLength = this.props.navigation.getParam('dataLength');
        console.log(group);
        return (
            <View style={styles.container}>
                {this.renderDate(date, dataLength)}
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
        paddingVertical: scaleVertical(20),
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
});
