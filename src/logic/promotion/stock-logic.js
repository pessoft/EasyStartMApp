export class StockLogic {
    /***
     * stockOption = {stocks, deliveryType, orderSum, basketProducts}
     */
    constructor(stockOption) {
        this.stocks = stockOption.stocks
        this.deliveryType = stockOption.deliveryType
        this.orderSum = stockOption.orderSum
        this.basketProducts = stockOption.basketProducts
    }

    getDiscount() {
        const stocksDiscount = this.getStockDiscountByTriggers()
        let result = 0

        for (let item of stocksDiscount) {
            if (item.ids.length == 0)
                continue

            result += item.discount
        }

        return result
    }

    getStockDiscountByTriggers() {
        const discountTriggerDeliveryType = this.getDiscountTriggerDeliveryType()
        const discountTriggerOrderSum = this.getDiscountTriggerOrderSum()
        const discountTriggerProducts = this.getDiscountTriggerProducts()

        return [
            discountTriggerDeliveryType,
            discountTriggerOrderSum,
            discountTriggerProducts]
    }

    getDiscountTriggerDeliveryType() {

    }

    getDiscountTriggerOrderSum() {

    }

    getDiscountTriggerProducts() {

    }

    getProducts() {
        const stocksProducts = this.getStockProductsByTriggers()
        let result = []

        for (let item of stocksProducts) {
            if (item.ids.length == 0)
                continue

            result = [...result, item.products]
        }

        return result
    }

    getStockProductsByTriggers() {
        const productsTriggerDeliveryType = this.getProductsTriggerDeliveryType()
        const productsTriggerOrderSum = this.getProductsTriggerOrderSum()
        const productsTriggerProducts = this.getProductsTriggerProducts()

        return [
            productsTriggerDeliveryType,
            productsTriggerOrderSum.products,
            productsTriggerProducts.products]
    }

    getProductsTriggerDeliveryType() {

    }

    getProductsTriggerOrderSum() {

    }

    getProductsTriggerProducts() {

    }

    getStockIdsDiscountForCurrentOrder() {
        return this.getStockIdsForCurrentOrder(stocksDiscount)
    }


    getStockIdsProductForCurrentOrder() {
        return this.getStockIdsForCurrentOrder(stocksProducts)
    }

    getStockIdsForCurrentOrder(items) {
        let result = []

        for (let item of items)
            result = [...result, item.ids]

        return result
    }

    /**
     * Возвращает наибольшие число
     * из всех настроек акций
     */
    getAllowedCountSelectBonusProduct() {

    }
}