import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { defaultState as defaultStyle } from '../store/style/reducer'
import { defaultState as defaultUserData } from '../store/user/reducer'
import { defaultState as defaultAppSetting} from '../store/app-settings/reducer'
import { defaultState as defaultBasket} from '../store/basket/reducer'

const migrations = {
  19: (state) => {
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
  storage,
  version: 19,
  whitelist: ['user', 'style', 'appSetting', 'basket'],
  migrate: createMigrate(migrations, { debug: true }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
