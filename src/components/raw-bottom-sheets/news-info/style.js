import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  messageContainer: {
    flex: 1,
  },
  messageTitle: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  message: {
    lineHeight: 24,
    marginVertical: 20
  },
  messageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
  },
  buttonContainer: {
    width: 100,
    margin: 5,
  },
  image: {
    borderRadius: 6,
    marginTop: 5,
    aspectRatio: 115 / 37,
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
  }
})