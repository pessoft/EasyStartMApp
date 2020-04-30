import { StyleSheet, Dimensions } from 'react-native'
const {height} = Dimensions.get('window')

export default StyleSheet.create({
  items: {
      flex: 4/8,
      justifyContent: 'center'
  },
  logoContainer: {
      flex: height <= 592 ? 2/8 : 3/8,
      borderBottomWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
      
  },
  logo: {
    width: height <= 592 ? 200 : 250,
    resizeMode: 'contain'
  },
  additionalInfo: {
      flex: 3/8,
      paddingTop: 5,
      borderTopWidth: 1,
  },
  social: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25
  },
  btnSocialWrapper: {
    marginTop: 10,
    marginHorizontal: 8
  },
})