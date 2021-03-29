import { Alert, BackHandler, Linking } from 'react-native'
import VersionCheck from 'react-native-version-check'

export const checkUpdate = async () => {
    const updateNeeded = await VersionCheck.needUpdate()
    if (updateNeeded.isNeeded) {
        Alert.alert(
            'Доступно обновление',
            'Пожалуйста, обновите приложение на последнюю версию',
            [{
                text: 'Обновить',
                onPress: () => {
                    BackHandler.exitApp()
                    Linking.openURL(updateNeeded.storeUrl)
                }
            }],
            { cancelable: false }
        )
    }
}