import { TriggerType } from './trigger-type'
import { RewardType } from './reward-type'
import { DiscountType } from './discount-type'
import { getMaxOfArray } from '../../helpers/utils'

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

    getDiscount(discountType) {
        const stocksDiscount = this.getStockDiscountByTriggers(discountType)
        let result = 0

        for (let item of stocksDiscount) {
            if (item.ids.length == 0)
                continue

            result += item.discount
        }

        return result
    }

    getStockDiscountByTriggers(discountType) {
        const discountTriggerDeliveryType = this.getDiscountTriggerDeliveryType(discountType)
        const discountTriggerOrderSum = this.getDiscountTriggerOrderSum(discountType)
        const discountTriggerProducts = this.getDiscountTriggerProducts(discountType)

        return [
            discountTriggerDeliveryType,
            discountTriggerOrderSum,
            discountTriggerProducts]
    }

    getDiscountTriggerDeliveryType(discountType) {
        const stocks = this.stocks.filter(p => p.ConditionType == TriggerType.DeliveryOrder
            && p.RewardType == RewardType.Discount
            && p.DiscountType == discountType
            && p.ConditionDeliveryType == this.deliveryType)
        const discountItem = this.transformDiscount(stocks)

        return discountItem
    }

    getDiscountTriggerOrderSum(discountType) {
        const stocks = this.stocks.filter(p => p.ConditionType == TriggerType.SummOrder
            && p.RewardType == RewardType.Discount
            && p.DiscountType == discountType
            && p.ConditionOrderSum <= this.orderSum)
        const discountItem = this.transformDiscount(stocks)

        return discountItem
    }

    getDiscountTriggerProducts(discountType) {
        const containsProducts = productsFromStock => {
            const productIdsFromStock = Object.keys(productsFromStock)
            const productIdsFromBasket = Object.keys(this.basketProducts)
            let result = productIdsFromStock.length > 0

            for (const id of productIdsFromStock) {
                if (productIdsFromBasket.indexOf(id) == -1
                    || productIdsFromStock[id] != productIdsFromBasket[id].count) {
                    result = false;
                    break;
                }
            }

            return result
        }

        const stocks = this.stocks.filter(p => p.ConditionType == TriggerType.ProductsOrder
            && p.RewardType == RewardType.Discount
            && p.DiscountType == discountType
            && containsProducts(p.ConditionCountProducts))
        const discountItem = this.transformDiscount(stocks)

        return discountItem
    }

    transformDiscount(stocks) {
        const discountItem = {
            ids: [],
            discount: 0
        }

        if (stocks.length > 0) {
            for (const stock of stocks) {
                discountItem.ids.push(stock.Id)
                discountItem.discount += stock.DiscountValue
            }
        }

        return discountItem
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

    getStocksTriggerDeliveryType() {
        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.DeliveryOrder
            && p.RewardType == RewardType.Products
            && p.ConditionDeliveryType == this.deliveryType)

        return stocks
    }

    getProductsTriggerDeliveryType() {
        const stocks = this.getStocksTriggerDeliveryType()
        const discountItem = this.transformStockProducts(stocks)

        return discountItem
    }

    getStocksTriggerOrderSum() {
        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.SummOrder
            && p.RewardType == RewardType.Products
            && p.ConditionOrderSum <= this.orderSum)

        return stocks
    }

    getProductsTriggerOrderSum() {
        const stocks = this.getStocksTriggerOrderSum()
        const discountItem = this.transformStockProducts(stocks)

        return discountItem
    }

    getStocksTriggerProducts() {
        const containsProducts = productsFromStock => {
            const productIdsFromStock = Object.keys(productsFromStock)
            const productIdsFromBasket = Object.keys(this.basketProducts)
            let result = productIdsFromStock.length > 0

            for (const id of productIdsFromStock) {
                if (productIdsFromBasket.indexOf(id) == -1
                    || productIdsFromStock[id] != productIdsFromBasket[id].count) {
                    result = false;
                    break;
                }
            }

            return result
        }

        const stocks = this.stocks.filter(p => p.ConditionType == TriggerType.ProductsOrder
            && p.RewardType == RewardType.Products
            && containsProducts(p.ConditionCountProducts))

        return stocks
    }

    getProductsTriggerProducts() {
        const stocks = this.getStocksTriggerProducts()
        const discountItem = this.transformStockProducts(stocks)

        return discountItem
    }

    transformStockProducts(stocks) {
        const productItem = {
            ids: [],
            products: []
        }

        if (stocks.length > 0) {
            for (const stock of stocks) {
                const productIds = Object.keys(stock.ConditionCountProducts)

                productItem.ids.push(stock.Id)
                productItem.products += [...productItem.products, productIds]
            }
        }

        return discountItem
    }

    getStockIdsDiscountForCurrentOrder() {
        const stocksDiscount = this.getStockDiscountByTriggers()
        return this.getStockIdsForCurrentOrder(stocksDiscount)
    }


    getStockIdsProductForCurrentOrder() {
        const stocksProducts = this.getStockProductsByTriggers()
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
        const counts = [
            getMaxOfArray(this.getStocksTriggerDeliveryType().map(p => p.CountBonusProducts)),
            getMaxOfArray(this.getStocksTriggerOrderSum().map(p => p.CountBonusProducts)),
            getMaxOfArray(this.getStocksTriggerProducts()().map(p => p.CountBonusProducts))
        ]

        return getMaxOfArray(counts)
    }
}