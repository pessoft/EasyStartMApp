import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { defaultState } from '../store/style/reducer'

const migrations = {
    5: (state) => {
      return {
        ...state,
        style: {
            ...defaultState
        }
      }
    },
  }

const persistConfig = {
    key: 'root',
    storage,
    version: 5,
    whitelist: ['user', 'style'],
    migrate: createMigrate(migrations, { debug: true }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)