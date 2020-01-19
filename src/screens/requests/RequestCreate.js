import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleHorizontal, scaleVertical} from '../../lib/util';
import TransparentButton from '../../components/TransparentButton';
import Button from '../../components/Button';

export default class RequestCreate extends Component {
    onCancelButtonPress = () => {
        console.log('cancelButton pressed');
    };

    onConfirmRequestButtonPress = () => {
        console.log('confirmRequestButtonPressed');
    };

    renderRow = params => (
        <View>
            <View>
                <Text>{params.title}</Text>
            </View>
            <View>
                <Text>{params.data}</Text>
                {params.details && <Text>{params.details}</Text>}
            </View>
        </View>
    );

    render() {
        const request = this.props.navigation.getParam('request');
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    {request && (
                        <Fragment>
                            {this.renderRow({
                                title: request.date,
                                data: 'ТБО',
                                details: `${request.tbo.cubometers} м3`,
                            })}
                            {this.renderRow({
                                title: 'Куда',
                                data: 'Свалка ТЦ Филион',
                            })}
                            {this.renderRow({
                                title: 'Машина',
                                data: 'х123он 77',
                            })}
                        </Fragment>
                    )}
                    <TransparentButton
                        onPress={this.onCancelButtonPress}
                        text={'Отменить'}
                        style={styles.transparentButton}
                    />
                </View>
                <View style={styles.footerContainer}>
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
        paddingVertical: scaleVertical(40),
        paddingHorizontal: scaleHorizontal(25),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    transparentButton: {
        marginTop: scaleVertical(65),
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerContainer: {
        height: '15%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
