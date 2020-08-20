import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  image: {
    borderRadius: 6,
    marginTop: 5,
    aspectRatio: 1,
    resizeMode: 'stretch',
    minWidth: '100%',
  },
  stockDescription: {
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },

  //=====
  productWrapper: {
    flex: 1,
  },
  productBaseInfo: {
    marginBottom: 10
  },
  additionalInfo: {
    marginVertical: 5
  },
  productOptions: {
    justifyContent:'center',
    paddingHorizontal: 18,
    paddingVertical: 30,
  }
})