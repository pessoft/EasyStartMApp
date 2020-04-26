import { StyleSheet, Platform, Dimensions } from 'react-native'

const min320 = Dimensions.get('window').width <= 320

export default StyleSheet.create({
  contacts: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 10
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    height: 38,
    maxHeight: 38,
    marginHorizontal: 5
  },
  itemContainer: {
    flex: 1,
    minHeight: 37,
    height: 37,
    maxHeight: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRight: {
    borderRightWidth: 1
  },
  inputText: {
    width: min320 ? 130 : 160,
    textAlign: 'center',
    borderWidth: 0,
    padding: Platform.OS == 'ios' ? 8 : 3,
    maxHeight: 38,
  }
})