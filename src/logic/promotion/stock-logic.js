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

    }

    getStockIdsDiscountForCurrentOrder() {

    }

    getStockIdsProductForCurrentOrder() {

    }
}