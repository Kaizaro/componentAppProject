import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import {setRequestStatus, setRequestTonnageValue} from '../../api/Requests';
import {NavigationActions, StackActions} from 'react-navigation';
import ChangeDataFieldInput from '../../components/ChangeDataFieldInput';

let request;
let code;

export default class RequestCreate extends Component {
    constructor(props) {
        super(props);
        request = props.navigation.getParam('request');
        code = props.navigation.getParam('code');
        this.state = {
            showInputField: false,
            tonnage: 0,
        };
    }

    onChangeTonnage = tonnage => {
        console.log(tonnage);
        this.setState({tonnage});
    };

    showInputField = () => {
        this.setState({showInputField: true});
    };

    closeInputField = () => {
        this.setState({showInputField: false});
    };

    onChangeTonnageInRequest = async () => {
        const {tonnage} = this.state;
        if (
            parseInt(request.tonnage) + 5 < parseInt(tonnage) ||
            parseInt(tonnage) < parseInt(request.tonnage)
        ) {
            alert(
                'Вы не можете ввести такое количество тонн. Введите правильное количество.',
            );
        } else {
            const setTonnageValue = await setRequestTonnageValue(
                code,
                parseFloat(tonnage),
            );
            console.log(setTonnageValue);
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
            if (confirmRequestButtonResponse.status === 200) {
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

    onCancelRequestButtonPress = async code => {
        console.log('cancelButton pressed');
        const cancelRequestButtonResponse = await setRequestStatus(
            code,
            'unused',
        );
        console.log(cancelRequestButtonResponse);
        if (cancelRequestButtonResponse && cancelRequestButtonResponse.status) {
            if (cancelRequestButtonResponse.status === 200) {
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

    renderModal = () => {
        const {showInputField, tonnage} = this.state;
        return (
            <ChangeDataFieldInput
                defaultValue={request.tonnage}
                value={tonnage}
                valueChange={this.onChangeTonnage}
                valueSubmit={this.onChangeTonnageInRequest}
                visibleField={showInputField}
                fieldClose={this.closeInputField}
            />
        );
    };

    renderRow = params => (
        <View style={styles.rowContainer}>
            <View style={styles.rowTitleContainer}>
                <Text style={styles.rowTitleText}>{params.title}</Text>
            </View>
            <View style={styles.rowDataContainer}>
                <Text
                    style={styles.rowDataText}
                    onPress={params.pressAction ? params.pressAction : null}>
                    {params.data}
                </Text>
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
                                    data: `${parseFloat(request.volume).toFixed(
                                        1,
                                    )} куб.см.`,
                                })}
                            {request.tonnage &&
                                this.renderRow({
                                    title: 'Тоннаж',
                                    data: `${parseFloat(
                                        request.tonnage,
                                    ).toFixed(1)} т.`,
                                    pressAction: this.showInputField,
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
                {this.renderModal()}
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
