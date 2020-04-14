import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    cardFrom: {
        height: 120,
        minHeight: 120,
        justifyContent: 'center'
    },
    amountLabel: {
        marginBottom: 15,
        textAlign: 'center'
    },
    payButtonContainer: {
        minHeight: 35,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    payButtonWrap: {
        width: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardNumber: {
        flex: 1,
        textAlign: 'center',
        margin: 0,
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingVertical: Platform.OS == 'ios' ? 10 : 5
    },
    cvv: {
        flex: 1,
        textAlign: 'center',
        margin: 0,
        borderWidth: 1,
        paddingVertical: Platform.OS == 'ios' ? 10 : 5
    },
    cardExpiryDate: {
        flex: 1,
        flexDirection: 'row',
        minHeight: Platform.OS == 'ios' ? 20 : 10
    },
    month: {
        flex: 1,
        textAlign: 'center',
        margin: 0,
        borderWidth: 1,
        borderBottomLeftRadius: 5,
        paddingVertical: Platform.OS == 'ios' ? 10 : 5
    },
    year: {
        flex: 1,
        textAlign: 'center',
        margin: 0,
        borderWidth: 1,
        borderBottomRightRadius: 5,
        paddingVertical: Platform.OS == 'ios' ? 10 : 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        width: 150,
        height: 150
    },
    infoText: {
        marginTop: 5,
        textAlign: 'center',
        width: 300
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOk: {
        width: 280,
        alignItems: 'stretch',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        position: 'absolute',
        bottom: 10,
    },
    success: {
        width: 150,
        height: 150
    },
})