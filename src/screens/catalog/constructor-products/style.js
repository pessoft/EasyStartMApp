import { StyleSheet, Dimensions } from 'react-native'

const size = Dimensions.get('screen').width / 3

export default StyleSheet.create({
    constructorFooter: {
        marginTop: 6,
        marginBottom: 12,
        height: 130,
        maxHeight: 130,
    },
    successContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    },
    success: {
        width: size,
        height: size
    }
})