import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  reviewItem: {
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },

  reviewContainer: {
    marginLeft: 10
  },
  userPhoto: {
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 2
  },
  header: {
    fontWeight: 'bold',
  },
  reviewText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  reviewDateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewDate: {
    marginLeft: 5,
  },
})