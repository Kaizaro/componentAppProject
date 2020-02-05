import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import {
    getCodeState,
    setRequestStatus,
    setRequestTonnageValue,
} from '../../api/Requests';
import {NavigationActions, StackActions} from 'react-navigation';
import ChangeDataFieldInput from '../../components/ChangeDataFieldInput';
import Icon from 'react-native-vector-icons/FontAwesome';

let code;

export default class RequestCreate extends Component {
    constructor(props) {
        super(props);
        const request = props.navigation.getParam('request');
        code = props.navigation.getParam('code');
        this.state = {
            showInputField: false,
            tonnageToAdd: '',
            request: request,
        };
    }

    onChangeTonnage = tonnageToAdd => {
        this.setState({tonnageToAdd});
    };

    showInputField = () => {
        this.setState({showInputField: true});
    };

    closeInputField = () => {
        this.setState({showInputField: false});
    };

    onChangeTonnageInRequest = async () => {
        const {tonnageToAdd, request} = this.state;
        if (parseInt(tonnageToAdd) < 0 || parseInt(tonnageToAdd) > 5) {
            alert(
                'Вы не можете ввести такое количество тонн. Введите правильное количество.',
            );
        } else {
            const tonnage =
                tonnageToAdd.length !== 0
                    ? parseFloat(parseFloat(request.tonnage).toFixed(1)) +
                      parseFloat(tonnageToAdd)
                    : null;
            console.log(tonnage);
            const setTonnageValue = tonnage
                ? await setRequestTonnageValue(code, tonnage.toString())
                : null;
            console.log(setTonnageValue);
            if (
                setTonnageValue &&
                setTonnageValue.status &&
                setTonnageValue.status === 200
            ) {
                this.setState({tonnageToAdd: ''});
                this.getRequestData();
            }
        }
    };

    getRequestData = async () => {
        const codeState = await getCodeState(code);
        console.log(codeState);
        if (codeState && codeState.status && codeState.status === 200) {
            this.setState({request: codeState.data}, () =>
                this.closeInputField(),
            );
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
        const {showInputField, tonnageToAdd, request} = this.state;
        return (
            <ChangeDataFieldInput
                defaultValue={request.tonnage}
                value={tonnageToAdd}
                valueChange={this.onChangeTonnage}
                valueSubmit={this.onChangeTonnageInRequest}
                visibleField={showInputField}
                fieldClose={this.closeInputField}
            />
        );
    };

    renderRow = params => (
        <TouchableOpacity
            activeOpacity={0.4}
            disabled={!params.pressAction || params.disabled}
            onPress={params.pressAction}
            style={styles.rowContainer}>
            <View style={styles.rowTitleContainer}>
                <Text style={styles.rowTitleText}>{params.title}</Text>
            </View>
            <View style={styles.rowDataContainer}>
                <Text style={styles.rowDataText}>{params.data}</Text>
                {params.pressAction && !params.disabled && (
                    <Icon
                        style={{marginTop: scaleVertical(2)}}
                        name={'edit'}
                        size={20}
                        color={APP_COLORS.DARK_GREY}
                    />
                )}
                {params.pressAction && params.disabled && (
                    <Text style={styles.rowDataNotification}>
                        Талон использован
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );

    render() {
        const {request} = this.state;
        console.log(request.tonnage);
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
                                    disabled: request.status,
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
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowDataText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(16),
        color: APP_COLORS.PRIMARY_BLACK,
    },
    rowDataNotification: {
        alignSelf: 'flex-end',
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(12),
        color: APP_COLORS.RED,
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
