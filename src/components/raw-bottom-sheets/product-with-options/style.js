import { StyleSheet, Dimensions } from 'react-native'

const size = Dimensions.get('screen').width / 3

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
    marginTop: 5,
    marginBottom: 10
  },
  additionalInfo: {
    marginVertical: 5
  },
  productOptionsBtnBasket: {
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 30,
  },
  groupWrapper: {
    borderRadius: 5,
    marginBottom: 10,
    padding: 10
  },
  additionalFillingGroup: {
    marginTop: 5
  },
  groupLabel: {
    marginBottom: 8
  },
  successContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  success: {
    width: size,
    height: size
  }
})