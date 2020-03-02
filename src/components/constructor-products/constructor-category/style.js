import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    padding: 5,
    borderRadius: 5,
    elevation: 6
  },
  header: {
    margin: 2,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ingredients: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
})