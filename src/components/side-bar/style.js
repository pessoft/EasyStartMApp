import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  items: {
      flex: 1
  },
  logoContainer: {
      height: 200,
      borderBottomWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
      
  },
  logo: {
    width: 200,
    resizeMode: 'contain'
  },
  additionalInfo: {
      height: 200,
      paddingTop: 5,
      borderTopWidth: 1,
  },
  social: {
    flexDirection:'row',
    justifyContent: 'center'
  },
  btnSocialWrapper: {
    marginTop: 10,
    marginHorizontal: 5
  }
})