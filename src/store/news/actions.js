export const SET_SELECTED_NEWS = 'SET_SELECTED_NEWS'

export const setSelectedNews = selectedNews => {
    return {
        type: SET_SELECTED_NEWS,
        payload: selectedNews
    }
}
