import { combineReducers } from 'redux'
import { appSettingReducer } from './app-settings/reducer'
import { userReducer } from './user/reducer'

export default combineReducers({
  appSetting: appSettingReducer,
  user: userReducer,
})