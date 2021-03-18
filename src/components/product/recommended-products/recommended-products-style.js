import { StyleSheet, Dimensions } from 'react-native'

let width = Dimensions.get('screen').width - 24

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 1,
  }
})