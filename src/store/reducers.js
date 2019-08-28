import { combineReducers } from 'redux'
import { appSettingReducer } from './app-settings/reducer'
import { userReducer } from './user/reducer'
import { locationReducer } from './location/reducer';
import { mainReducer } from './main/reducer';
import { catalogReducer } from './catalog/reducer';

export default combineReducers({
  appSetting: appSettingReducer,
  user: userReducer,
  location: locationReducer,
  main: mainReducer,
  catalog: catalogReducer
})