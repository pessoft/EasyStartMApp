import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
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
    marginBottom: 12
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    paddingTop: 10,
    marginTop: 10
  },
  datePickerContainer: {
    borderWidth: 0.7,
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  }
})