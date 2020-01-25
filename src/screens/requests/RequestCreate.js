import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import {setRequestStatus} from '../../api/Requests';
import {NavigationActions, StackActions} from 'react-navigation';

let request;

export default class RequestCreate extends Component {
    constructor(props) {
        super(props);
        request = props.navigation.getParam('request');
    }

    onCancelRequestButtonPress = async code => {
        console.log('cancelButton pressed');
        const cancelRequestButtonResponse = await setRequestStatus(
            code,
            'unused',
        );
        console.log(cancelRequestButtonResponse);
        if (cancelRequestButtonResponse && cancelRequestButtonResponse.status) {
            if (
                cancelRequestButtonResponse.status === 200 &&
                cancelRequestButtonResponse.data
            ) {
                alert('Талон отменен диспетчером');
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'AppStack',
                        }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }
    };

    onConfirmRequestButtonPress = async code => {
        console.log('confirmRequestButtonPressed');
        const confirmRequestButtonResponse = await setRequestStatus(
            code,
            'used',
        );
        console.log(confirmRequestButtonResponse);
        if (
            confirmRequestButtonResponse &&
            confirmRequestButtonResponse.status
        ) {
            if (
                confirmRequestButtonResponse.status === 200 &&
                confirmRequestButtonResponse.data
            ) {
                alert('Талон принят диспетчером');
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'AppStack',
                        }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }
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
        const code = this.props.navigation.getParam('code');
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
                                data: code,
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
                        onPress={() => this.onCancelRequestButtonPress(code)}
                        text={'Отменить талон'}
                        style={styles.transparentButton}
                    />
                    <Button
                        onPress={() => this.onConfirmRequestButtonPress(code)}
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
