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
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
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
    borderRadius: 5,
    height: 40,
    maxHeight: 40,
  },
  itemContainer: {
    flex: 1,
    minHeight:39,
    height: 39,
    maxHeight: 39,
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
    maxHeight: 40,
  }
})