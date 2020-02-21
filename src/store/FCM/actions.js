import messaging from '@react-native-firebase/messaging'
import { registerDeviceFetch } from '../../api/requests'

export const FETCH_REGISTER_APP_WITH_FCM_REQUEST = 'FETCH_REGISTER_APP_WITH_FCM_REQUEST'
export const FETCH_REGISTER_APP_WITH_FCM_SUCCESS = 'FETCH_REGISTER_APP_WITH_FCM_SUCCESS'
export const FETCH_REGISTER_APP_WITH_FCM_FAILURE = 'FETCH_REGISTER_APP_WITH_FCM_FAILURE'

export const FETCH_REQUEST_PERMISSION_REQUEST = 'FETCH_REQUEST_PERMISSION_REQUEST'
export const FETCH_REQUEST_PERMISSION_SUCCESS = 'FETCH_REQUEST_PERMISSION_SUCCESS'
export const FETCH_REQUEST_PERMISSION_FAILURE = 'FETCH_REQUEST_PERMISSION_FAILURE'

export const SET_NOTIFICATION_ACTION_ON_EXECUTION = 'SET_NOTIFICATION_ACTION_ON_EXECUTION'
export const NOTIFICATION_ACTION_DONE = 'NOTIFICATION_ACTION_DONE'

export const FETCH_REQUEST_REGISTER_DEVICE_REQUEST = 'FETCH_REQUEST_REGISTER_DEVICE_REQUEST'
export const FETCH_REQUEST_REGISTER_DEVICE_SUCCESS = 'FETCH_REQUEST_REGISTER_DEVICE_SUCCESS'
export const FETCH_REQUEST_REGISTER_DEVICE_FAILURE = 'FETCH_REQUEST_REGISTER_DEVICE_FAILURE'

export const registerAppWithFCM = () => async (dispatch) => {
    dispatch(requestRegisterAppWithFCMPosts())

    try {
        await messaging().registerForRemoteNotifications()
        dispatch(successRegisterAppWithFCMPosts())
    } catch {
        dispatch(failureRegisterAppWithFCMPosts())
    }
}

export const requestPermission = () => async (dispatch) => {
    dispatch(requestRequestPermissionPosts())

    try {
        const granted = messaging().requestPermission()
        dispatch(successRequestPermissionPosts(granted.toString()))
    } catch {
        dispatch(failureRequestPermissionPosts())
    }
}

export const registerDevice = device => async (dispatch) => {
    dispatch(requestRequestRegisterDevicePosts())

    try {
        const token = await messaging().getToken()
        let deviceWithToken = {...device, token}

        await registerDeviceFetch(deviceWithToken)
        dispatch(successRequestRegisterDevicePosts(granted.toString()))
    } catch (ex) {
        dispatch(failureRequestRegisterDevicePosts(ex.message))
    }
}

export const setNotificationActionExecution = action => {
    return {
        type: SET_NOTIFICATION_ACTION_ON_EXECUTION,
        payload: action
    }
}

export const notificationActionDone = () => {
    return {
        type: NOTIFICATION_ACTION_DONE
    }
}

const requestRegisterAppWithFCMPosts = () => {
    return {
        type: FETCH_REGISTER_APP_WITH_FCM_REQUEST
    }
}

const successRegisterAppWithFCMPosts = () => {
    return {
        type: FETCH_REGISTER_APP_WITH_FCM_SUCCESS,
    }
}

const failureRegisterAppWithFCMPosts = () => {
    return {
        type: FETCH_REGISTER_APP_WITH_FCM_FAILURE,
        payload: true
    }
}

const requestRequestPermissionPosts = () => {
    return {
        type: FETCH_REQUEST_PERMISSION_REQUEST
    }
}

const successRequestPermissionPosts = granted => {
    return {
        type: FETCH_REQUEST_PERMISSION_SUCCESS,
        payload: granted
    }
}

const failureRequestPermissionPosts = () => {
    return {
        type: FETCH_REQUEST_PERMISSION_FAILURE,
        payload: true
    }
}

const requestRequestRegisterDevicePosts = () => {
    return {
        type: FETCH_REQUEST_REGISTER_DEVICE_REQUEST
    }
}

const successRequestRegisterDevicePosts = () => {
    return {
        type: FETCH_REQUEST_REGISTER_DEVICE_SUCCESS,
    }
}

const failureRequestRegisterDevicePosts = errMessage => {
    return {
        type: FETCH_REQUEST_REGISTER_DEVICE_FAILURE,
        payload: errMessage
    }
}