import React, {Component, Fragment} from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';
import {APP_COLORS, APP_FONTS} from '../../Styles';
import {setProblem, setRequestStatus} from '../../api/Requests';
import {NavigationActions, StackActions} from 'react-navigation';

export default class RequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: props.navigation.getParam('request'),
            comment: '',
            messageModalVisible: false,
        };
    }

    onProblemButtonPress = () => {
        this.setState({messageModalVisible: true});
    };

    onSendMessageButtonPress = async () => {
        const {request, comment} = this.state;
        const requestSetProblem = await setProblem(request.code, comment);
        console.log(requestSetProblem);
        if (
            requestSetProblem &&
            requestSetProblem.status &&
            requestSetProblem.status === 200
        ) {
            this.setState({
                comment: '',
                messageModalVisible: false,
            });
            this.props.navigation.goBack();
        }
    };

    onCommentChange = comment => {
        this.setState({comment});
    };

    renderMessageScreen = () => {
        return (
            <Modal
                presentationStyle={'overFullScreen'}
                animationType={'fade'}
                animated={true}
                transparent={true}
                visible={this.state.messageModalVisible}
                onRequestClose={() => {
                    this.setState({
                        messageModalVisible: false,
                    });
                }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            messageModalVisible: false,
                        });
                    }}
                    activeOpacity={1}
                    style={styles.modalContainer}>
                    <View style={styles.modalBlock}>
                        <Text style={styles.modalText}>Опишите проблему</Text>

                        <TextInput
                            onChangeText={this.onCommentChange}
                            placeholder={'Введите описание проблемы'}
                            maxLength={500}
                            autoCapitalize={'none'}
                            autoFocus={true}
                            autoCorrect={false}
                            multiline={true}
                            defaultValue={this.state.comment}
                            numberOfLines={8}
                            style={styles.modalTextInput}
                        />
                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                            <Text
                                style={{
                                    fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
                                    fontSize: scaleHorizontal(14),
                                    color: APP_COLORS.LIGHT_GRAY,
                                    textAlign: 'right',
                                }}>
                                {`${this.state.comment.length}/500`}
                            </Text>
                        </View>
                        <Button
                            onPress={this.onSendMessageButtonPress}
                            text={'Отправить'}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
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
        const {request} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    {request && (
                        <Fragment>
                            {this.renderRow({
                                title: 'Код талона',
                                data: request.code,
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
                        onPress={this.onProblemButtonPress}
                        text={'Проблема'}
                    />
                </View>
                {this.renderMessageScreen()}
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
        height: '15%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000050',
    },
    modalBlock: {
        width: '100%',
        paddingVertical: scaleVertical(30),
        paddingHorizontal: scaleHorizontal(30),
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    modalText: {
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        fontSize: scaleHorizontal(24),
        color: APP_COLORS.DARK_GREY,
    },
    modalTextInput: {
        width: '100%',
        justifyContent: 'flex-start',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        marginTop: scaleVertical(20),
        minHeight: 7 * 18,
        maxHeight: scaleVertical(667) / 2,
        paddingRight: 16,
        fontSize: 18,
        lineHeight: 24,
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
    },
});
