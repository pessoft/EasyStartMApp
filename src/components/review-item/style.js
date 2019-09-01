import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  reviewItem: {
    paddingVertical: 15,
    marginHorizontal: 15,
    borderColor: '#E6E7E8',
    borderBottomWidth: 0.5,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewContainer: {
    marginLeft: 10
  },
  userPhoto: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 2
  },
  header: {
    fontWeight: 'bold',
    color: '#357ae8'
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
    color: '#bbbcbc'
  },
  h5: {
    fontSize: 16
  },
  h7: {
    fontSize: 12
  },
})