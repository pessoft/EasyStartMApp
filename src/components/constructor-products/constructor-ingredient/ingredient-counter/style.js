import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:'#00000070',
        borderRadius: 2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9
    },
    counterContainer: {
        paddingVertical: 7,
        paddingHorizontal: 36,
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    fontBold: {
        fontWeight: 'bold'
    },
    resetContainer: {
        position: 'absolute',
        right: 5,
        top: 5,
        paddingLeft: 10,
        paddingBottom: 10,
        zIndex: 10
    }
})
