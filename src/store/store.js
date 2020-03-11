import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { defaultState as defaultStyle } from '../store/style/reducer'
import { defaultState as defaultUserData } from '../store/user/reducer'

const migrations = {
    5: (state) => {
      return {
        ...state,
        style: {
            ...defaultStyle
        }
      }
    },
    6: (state) => {
      return {
        ...state,
        user: {
            ...defaultUserData
        }
      }
    },
  }

const persistConfig = {
    key: 'root',
    storage,
    version: 6,
    whitelist: ['user', 'style'],
    migrate: createMigrate(migrations, { debug: true }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)