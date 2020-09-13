// @flow
import React, {useState} from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scaleHorizontal, scaleVertical} from '../lib/util';
import {APP_COLORS, APP_FONTS} from '../Styles';
import Button from './Button';
import TransparentButton from './TransparentButton';

type TProps = {
    currentPage: number,
    nextPage: number,
    pagesAmount: number,
    requestsAmount: number,
    pageChangeFunc: any,
    onNextPagePress: any,
    onPreviousPagePress: any,
};

export const PageFooter = (props: TProps) => {
    const {
        currentPage,
        nextPage,
        pagesAmount,
        requestsAmount,
        pageChangeFunc,
        onNextPagePress,
        onPreviousPagePress,
    } = props;
    const [movingPage, setMovingPage] = useState<string>(
        currentPage.toString(10),
    );
    const [pageModalVisible, setPageModalVisible] = useState<boolean>(false);

    const onPageChange = (page: string) => {
        console.log(page);
        setMovingPage(page);
    };

    const onConfirmButtonPress = () => {
        console.log(movingPage);
        pageChangeFunc(movingPage);
        closeModal();
    };

    const showModal = (): void => {
        setPageModalVisible(true);
    };

    const closeModal = (): void => {
        setPageModalVisible(false);
    };

    const renderModal = () => {
        return (
            <Modal
                hardwareAccelerated={true}
                presentationStyle={'overFullScreen'}
                animationType={'fade'}
                visible={pageModalVisible}
                onRequestClose={closeModal}>
                <View style={styles.externalModalContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            Выберите страницу, на которую вы хотите перейти
                        </Text>
                        <View style={styles.modalTextInputContainer}>
                            <TextInput
                                onChangeText={onPageChange}
                                placeholder={currentPage.toString(10) ?? '1'}
                                placeholderTextColor={APP_COLORS.DARK_GREY}
                                value={movingPage}
                                autoFocus={true}
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                                style={styles.modalTextInput}
                                maxLength={pagesAmount.toString(10).length}
                            />
                        </View>
                        <Button
                            style={styles.modalButton}
                            text={'Подтвердить'}
                            onPress={onConfirmButtonPress}
                        />
                        <TransparentButton
                            style={styles.modalButton}
                            text={'Вернуться'}
                            onPress={closeModal}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageFooterText}>
                Талонов: {10 * currentPage} / {requestsAmount}
            </Text>
            <View style={styles.pageFooterRow}>
                <TouchableOpacity onPress={onPreviousPagePress} disabled={currentPage === 1}>
                    <Icon
                        name={'arrow-left'}
                        allowFontScaling={true}
                        size={scaleHorizontal(25)}
                        color={
                            currentPage === 1
                                ? APP_COLORS.GREY
                                : APP_COLORS.LIGHT_GREEN
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showModal}
                    style={styles.pageFooterArrow}>
                    <Text style={styles.pageFooterText}>
                        {currentPage.toString(10) ?? '1'} /{' '}
                        {pagesAmount?.toString(10) ?? '1'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onNextPagePress}
                    disabled={currentPage === nextPage}
                    style={styles.pageFooterArrow}>
                    <Icon
                        name={'arrow-right'}
                        allowFontScaling={true}
                        size={scaleHorizontal(25)}
                        color={
                            currentPage === nextPage
                                ? APP_COLORS.GREY
                                : APP_COLORS.LIGHT_GREEN
                        }
                    />
                </TouchableOpacity>
            </View>
            {renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: scaleVertical(10),
        width: '100%',
        alignItems: 'center',
    },
    pageFooterRow: {
        marginTop: scaleVertical(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageFooterArrow: {
        marginLeft: scaleHorizontal(10),
    },
    pageFooterText: {
        fontSize: scaleHorizontal(16),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
    },
    externalModalContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#00000050',
        paddingHorizontal: scaleHorizontal(20),
        paddingVertical: scaleVertical(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        // flex: 1,
        width: '100%',
        paddingHorizontal: scaleHorizontal(20),
        paddingVertical: scaleVertical(20),
        borderRadius: scaleHorizontal(20),
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalText: {
        fontSize: scaleHorizontal(16),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        color: APP_COLORS.DARK_GREY,
    },
    modalTextInputContainer: {
        width: '100%',
        borderRadius: scaleHorizontal(20),
        backgroundColor: APP_COLORS.LIGHT_GRAY,
        marginTop: scaleVertical(15),
        paddingVertical: scaleVertical(15),
        paddingHorizontal: scaleHorizontal(10),
    },
    modalTextInput: {
        fontSize: scaleHorizontal(16),
        fontFamily: APP_FONTS.CERA_ROUND_PRO_BOLD,
        color: APP_COLORS.PRIMARY_BLACK,
        textAlign: 'left',
        letterSpacing: scaleHorizontal(0.5),
    },
    modalButton: {
        marginTop: scaleVertical(20),
    },
});
