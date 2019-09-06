export const SET_SELECTED_STOCK = 'SET_SELECTED_STOCK'

export const setSelectedStock = selectedStock => {
    return {
        type: SET_SELECTED_STOCK,
        payload: selectedStock
    }
}
