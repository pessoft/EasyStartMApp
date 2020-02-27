import Images from '../../images'
import { SERVER_DOMAIN } from '../../api/server-domain'

const defaultState = {
  logo: Images.logo,
  serverDomain: SERVER_DOMAIN,
  currencyPrefix: 'руб.',
  appPackageName: 'com.easystartmapp'
}

export const appSettingReducer = (state = defaultState) => state