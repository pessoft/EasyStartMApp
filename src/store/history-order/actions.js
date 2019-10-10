import { getHistoryOrderFetch } from '../../api/requests'

export const FETCH_HISTORY_ORDER_SUCCESS = 'FETCH_HISTORY_ORDER_SUCCESS'
export const FETCH_HISTORY_ORDER_REQUEST = 'FETCH_HISTORY_ORDER_REQUEST'
export const FETCH_HISTORY_ORDER_FAILURE = 'FETCH_HISTORY_ORDER_FAILURE'

export const SET_SELECT_ORDER_ID = 'SET_SELECT_ORDER_ID'

export const setSelectOrder = order => {
  return {
    type: SET_SELECT_ORDER_ID,
    payload: order
  }
}

export const getHistoryOrder = (clientId) => async (dispatch) => {
  dispatch(requestPosts())

  try {
    const history = await getHistoryOrderFetch(clientId)
    dispatch(successPosts(history))
  } catch {
    dispatch(failurePosts())
  }
}

const requestPosts = () => {
  return {
    type: FETCH_HISTORY_ORDER_REQUEST
  }
}

const successPosts = history => {
  return {
    type: FETCH_HISTORY_ORDER_SUCCESS,
    payload: history
  }
}

const failurePosts = () => {
  return {
    type: FETCH_HISTORY_ORDER_FAILURE,
    payload: true
  }
}