import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    bigImage: {
        alignItems: 'stretch',
    },
    contentBody: {
        marginTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    productInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 115,
        paddingHorizontal: 5,
        paddingBottom: 12,
        borderBottomWidth: 0.8,
        marginBottom: 12

    },
    leftBlock: {
        flex:1.5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: 105,
    },
    rightBlock: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 105
    },
    description: {
        alignItems: 'stretch',
        textAlign:'justify',
        flexWrap: 'wrap',
        lineHeight: 24
    },
    h1: {
        fontSize: 30
    },
    h2: {
        fontSize: 26
    },
    h3: {
        fontSize: 20
    },
    h4: {
        fontSize: 18
    },
    h5: {
        fontSize: 16
    },
    h6: {
        fontSize: 14
    }
})