import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultState as defaultStyle } from '../store/style/reducer'
import { defaultState as defaultUserData } from '../store/user/reducer'
import { defaultState as defaultAppSetting} from '../store/app-settings/reducer'
import { defaultState as defaultBasket} from '../store/basket/reducer'

const migrations = {
  20: (state) => {
    return {
      ...state,
      style: {
        ...defaultStyle
      },
      user: {
        ...defaultUserData
      },
      appSetting: {
        ...defaultAppSetting
      },
      basket: {
        ...defaultBasket
      }
    }
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 20,
  whitelist: ['user', 'style', 'appSetting', 'basket'],
  migrate: createMigrate(migrations, { debug: true }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
