import Images from '../../images'
import {SERVER_URL} from '../../API/serverURL'

const defaultState = {
  logo: Images.logo,
  serverURL:SERVER_URL
}

export const appSettingReducer = (state = defaultState) => state