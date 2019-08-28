export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY' 
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT' 

export const setSelectedCatagory = selectedCategory => {
    return {
        type: SET_SELECTED_CATEGORY,
        payload: selectedCategory
    }
}

export const setSelectedProduct = selectedProduct => {
    return {
        type: SET_SELECTED_PRODUCT,
        payload: selectedProduct
    }
}