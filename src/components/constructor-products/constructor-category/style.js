import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    marginVertical: 3,
    padding: 5
  },
  header: {
    margin: 2,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  ingredients: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
})