import messaging from '@react-native-firebase/messaging'

export const FETCH_REGISTER_APP_WITH_FCM_REQUEST = 'FETCH_REGISTER_APP_WITH_FCM_REQUEST'
export const FETCH_REGISTER_APP_WITH_FCM_SUCCESS = 'FETCH_REGISTER_APP_WITH_FCM_SUCCESS'
export const FETCH_REGISTER_APP_WITH_FCM_FAILURE = 'FETCH_REGISTER_APP_WITH_FCM_FAILURE'

export const FETCH_REQUEST_PERMISSION_REQUEST = 'FETCH_REQUEST_PERMISSION_REQUEST'
export const FETCH_REQUEST_PERMISSION_SUCCESS = 'FETCH_REQUEST_PERMISSION_SUCCESS'
export const FETCH_REQUEST_PERMISSION_FAILURE = 'FETCH_REQUEST_PERMISSION_FAILURE'

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