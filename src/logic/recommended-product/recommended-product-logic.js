export class RecommendedProductLogic {
    /**
     * 
     * @param {Object} param {
     *    recommendedProducts: dictionary,
     *    products: dictionary
     *  } 
     */
    constructor(recommendedProducts, products) {
        this.recommendedProducts = recommendedProducts
        this.products = products
    }

    /**
     * 
     * @param {Array} productIdsFromBasket 
     */
    getRecommendedProductIds(productIdsFromBasket) {
        let recommendedProductsResult = []
        if (!productIdsFromBasket || productIdsFromBasket.length == 0)
            return recommendedProductsResult

        const excludeProductIdFromRecommended = {}
        for (const productId of productIdsFromBasket) {
            excludeProductIdFromRecommended[productId] = true

            const product = this.products[productId]
            const recommendedProductList = this.recommendedProducts[product.CategoryId]

            if (!recommendedProductList || recommendedProductList.length == 0)
                continue

            recommendedProductsResult = [...recommendedProductsResult, ...recommendedProductList]
        }

        recommendedProductsResult = recommendedProductsResult.filter(productId => !excludeProductIdFromRecommended[productId])

        return recommendedProductsResult
    }
}