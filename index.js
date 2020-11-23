import { AppRegistry } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import App from './src/App'
import { name as appName } from './app.json'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App))
