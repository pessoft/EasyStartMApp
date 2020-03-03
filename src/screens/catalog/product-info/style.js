import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    bigImage: {
        alignItems: 'stretch',
    },
    contentBody: {
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 5
    },
    imageContainer: {
        marginTop: 10,
        borderRadius: 5,
        elevation: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        borderRadius: 5,
    },
    productInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
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
        height: 80,
    },
    rightBlock: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 80
    },
    description: {
        alignItems: 'stretch',
        flexWrap: 'wrap',
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    reviewsButtonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})