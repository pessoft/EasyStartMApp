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
        height: 105,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        paddingBottom: 10,
        borderBottomWidth: 0.8,
        marginBottom: 10

    },
    leftBlock: {
        flex:1.5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: 90,
    },
    rightBlock: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: 90
    },
    description: {
        alignItems: 'stretch',
        flexWrap: 'wrap',
        lineHeight: 24,
        paddingHorizontal:5
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