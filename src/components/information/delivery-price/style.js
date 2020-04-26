import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingTop: 17,
    paddingBottom: 17,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 4,
  },
  header: {
    paddingHorizontal: 10
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  paddingBottomText: {
    paddingBottom: 2,
    marginBottom: 0
  },
  AreaDeliveryInfo: {
    marginTop: 5
  }
})