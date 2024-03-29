import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    bigImage: {
        alignItems: 'stretch',
    },
    contentBody: {
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 6,
        elevation: 4,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    image: {
        minWidth: '100%',
        flex: 1,
        marginTop: 10,
        borderRadius: 6,
        resizeMode: 'stretch',
        aspectRatio: 1
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
    ratingBlock: {
        flex:1,
        justifyContent: 'flex-start',
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
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: 80,
    },
    reviewsButtonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    basketBlock: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})