import Images from '../../images'
import { SERVER_DOMAIN } from '../../api/server-domain'
import { Dimensions } from 'react-native'

const min320 = Dimensions.get('window').width <= 320

const defaultState = {
  logo: Images.logo,
  serverDomain: SERVER_DOMAIN,
  currencyPrefix: min320 ? 'р.' : 'руб.',
  appPackageName: 'com.easystartmapp'
}

export const appSettingReducer = (state = defaultState) => state