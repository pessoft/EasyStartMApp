import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    padding: 5,
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
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