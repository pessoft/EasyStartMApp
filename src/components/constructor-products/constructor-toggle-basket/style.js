import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        height: 130,
        borderRadius: 6,
        elevation: 4
    },
    blockHeader: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    headerPrice: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headerEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerCounter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    blockFooter: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textCenter: {
        textAlign: 'center'
    }
})