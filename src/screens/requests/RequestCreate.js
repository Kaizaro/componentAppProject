import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';
import {APP_COLORS, APP_FONTS} from '../../Styles';

let request;

export default class RequestCreate extends Component {
    constructor(props) {
        super(props);
        request = props.navigation.getParam('request');
    }

    onCancelButtonPress = () => {
        console.log('cancelButton pressed');
    };

    onConfirmRequestButtonPress = () => {
        console.log('confirmRequestButtonPressed');
    };

    renderRow = params => (
        <View style={styles.rowContainer}>
            <View style={styles.rowTitleContainer}>
                <Text style={styles.rowTitleText}>{params.title}</Text>
            </View>
            <View style={styles.rowDataContainer}>
                <Text style={styles.rowDataText}>{params.data}</Text>
                {params.details && <Text>{params.details}</Text>}
            </View>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    {request && (
                        <Fragment>
                            {/*{this.renderRow({*/}
                            {/*    title: request.date,*/}
                            {/*    data: 'ТБО',*/}
                            {/*    details: `${request.tbo.cubometers} м3`,*/}
                            {/*})}*/}
                            {this.renderRow({
                                title: 'Код талона',
                                data: this.props.navigation.getParam('code'),
                            })}
                            {this.renderRow({
                                title: 'Компания',
                                data: request.company,
                            })}
                            {this.renderRow({
                                title: 'Полигон',
                                data: request.polygon,
                            })}
                            {this.renderRow({
                                title: 'Водитель, телефон',
                                data: request.driver,
                            })}
                            {request.volume &&
                                this.renderRow({
                                    title: 'Объем',
                                    data: `${Math.round(
                                        request.tonnage,
                                    )} куб.см.`,
                                })}
                            {request.tonnage &&
                                this.renderRow({
                                    title: 'Тоннаж',
                                    data: `${Math.round(request.tonnage)} т.`,
                                })}
                            {this.renderRow({
                                title: 'Тип отходов',
                                data: request.typeWaste,
                            })}
                        </Fragment>
                    )}
                </View>
                <View style={styles.footerContainer}>
                    <TransparentButton
                        onPress={this.onCancelButtonPress}
                        text={'Отменить талон'}
                        style={styles.transparentButton}
                    />
                    <Button
                        onPress={this.onConfirmRequestButtonPress}
                        text={'Подтвердить'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // paddingVertical: scaleVertical(40),
        paddingHorizontal: scaleHorizontal(25),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: scaleVertical(10),
    },
    rowTitleContainer: {
        width: '40%',
        justifyContent: 'flex-start',
    },
    rowTitleText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(16),
        color: APP_COLORS.GREY,
    },
    rowDataContainer: {
        width: '60%',
        justifyContent: 'flex-start',
    },
    rowDataText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(16),
        color: APP_COLORS.PRIMARY_BLACK,
    },
    transparentButton: {
        height: scaleVertical(30),
        paddingBottom: scaleVertical(10),
        marginBottom: scaleVertical(20),
        width: scaleHorizontal(285),
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        height: '30%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
