import { SERVER_DOMAIN } from './server-domain'

export const updateUserQuery = `${SERVER_DOMAIN}/api/AdminApp/updateclient`
export const loginQuery = `${SERVER_DOMAIN}/api/AdminApp/login`
export const registrationClientQuery = `${SERVER_DOMAIN}/api/AdminApp/registrationclient`
export const restorePasswordClientQuery = `${SERVER_DOMAIN}/api/AdminApp/restorepasswordclient`

export const getLocationQuery = `${SERVER_DOMAIN}/api/AdminApp/getlocation`
export const getMainDataQuery = `${SERVER_DOMAIN}/api/AdminApp/getmaindata`

export const getProductReviewsQuery = `${SERVER_DOMAIN}/api/AdminApp/getproductreviews`
export const setProductReviewsQuery = `${SERVER_DOMAIN}/api/AdminApp/setProductReviews`

export const sendNewOrderQuery = `${SERVER_DOMAIN}/api/AdminApp/sendorder`

export const getHistoryOrdersQuery = `${SERVER_DOMAIN}/api/AdminApp/gethistoryorders`
export const getProductsHistoryOrderQuery = `${SERVER_DOMAIN}/api/AdminApp/getproductshistoryorder`

export const updateProductRatingQuery = `${SERVER_DOMAIN}/api/AdminApp/updateproductrating`

export const getCouponQuery = `${SERVER_DOMAIN}/api/AdminApp/getcoupun`

export const getPartnersTransactionQuery = `${SERVER_DOMAIN}/api/AdminApp/getpartnerstransaction`
export const getCashbackTransactionQuery = `${SERVER_DOMAIN}/api/AdminApp/getcashbacktransaction`
