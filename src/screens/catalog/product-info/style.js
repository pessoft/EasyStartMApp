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
        height: 100,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        marginBottom: 10

    },
    leftBlock: {
        flex: 1.5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: 90,
    },
    rightBlock: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 90
    },
    description: {
        alignItems: 'stretch',
        flexWrap: 'wrap',
        lineHeight: 24,
        paddingHorizontal: 5
    },
    reviewsButtonWithIco: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})