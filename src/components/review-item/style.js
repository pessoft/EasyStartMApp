import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  reviewItem: {
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#bbbcbc'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#357ae8'
  },
  reviewText: {
    flex:1,
    flexWrap: 'wrap',
  },
  reviewDate: {
    alignSelf: 'flex-end'
  },
  h5: {
    fontSize: 16
  },
  h7: {
    fontSize: 12
  },
})