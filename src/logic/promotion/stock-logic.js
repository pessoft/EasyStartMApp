import { TriggerType } from './trigger-type'
import { RewardType } from './reward-type'
import { DiscountType } from './discount-type'
import { getMaxOfArray } from '../../helpers/utils'
import { StockInteractionType } from '../../helpers/stock-interaction-type'

export class StockLogic {
    /***
     * stockOption = {stocks, deliveryType, orderSum, basketProducts}
     */
    constructor(stockOption) {
        this.stocks = stockOption.stocks
        this.deliveryType = stockOption.deliveryType
        this.orderSum = stockOption.orderSum
        this.basketProducts = stockOption.basketProducts
        this.stockInteractionType = stockOption.stockInteractionType
        this.products = stockOption.productDictionary
    }

    getDiscount(discountType) {
        switch (this.stockInteractionType) {
            case StockInteractionType.PartialJoin:
                return this.getDiscountByPartialJoin(discountType)
            case StockInteractionType.FullExclude:
                return this.getDiscountByFullExclude(discountType)
            default:
                return this.getDiscountByFullJoin(discountType)
        }
    }

    getDiscountByFullJoin = discountType => {
        const stocksDiscount = this.getStockDiscountByTriggers(discountType)
        let result = 0

        for (let item of stocksDiscount) {
            if (item.ids.length == 0)
                continue

            result += item.discount
        }

        return result
    }

    getDiscountByPartialJoin = discountType => {
        const stocksDiscountPercent = this.getStockDiscountByTriggers(DiscountType.Percent)
        const stocksDiscountRubel = this.getStockDiscountByTriggers(DiscountType.Ruble)

        const maxDiscountPercent = getMaxOfArray(stocksDiscountPercent.map(p => p.discount))
        const maxDiscountRubel = parseFloat(getMaxOfArray(stocksDiscountRubel.map(p => p.discount)))
        const maxDiscountPercentConvertToRubel = parseFloat(this.orderSum) * maxDiscountPercent / 100.0

        if (discountType == DiscountType.Percent && maxDiscountPercentConvertToRubel >= maxDiscountRubel)
            return maxDiscountPercent
        else if (discountType == DiscountType.Ruble && maxDiscountRubel > maxDiscountPercentConvertToRubel)
            return maxDiscountRubel

        return 0
    }

    getDiscountByFullExclude = discountType => {
        const productsWithPaxPrice = this.getProductsByFullExclude()

        if (productsWithPaxPrice.length)
            return 0
        else
            return this.getDiscountByPartialJoin(discountType)
    }

    getStockDiscountByTriggers(discountType) {
        const discountTriggerDeliveryType = this.getDiscountTriggerDeliveryType(discountType)
        const discountTriggerOrderSum = this.getDiscountTriggerOrderSum(discountType)
        const discountTriggerProducts = this.getDiscountTriggerProducts(discountType)
        const discountTriggerBirthday = this.getDiscountTriggerBirthday(discountType)

        return [
            discountTriggerDeliveryType,
            discountTriggerOrderSum,
            discountTriggerProducts,
            discountTriggerBirthday]
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
        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.SummOrder
            && p.RewardType == RewardType.Discount
            && p.DiscountType == discountType
            && p.ConditionOrderSum <= this.orderSum)
        stocks = this.filterStockByExcludeProductTriggerOrderSum(stocks)
        const discountItem = this.transformDiscount(stocks)

        return discountItem
    }

    getDiscountTriggerProducts(discountType) {
        const productIdsFromBasket = Object.keys(this.basketProducts)

        const containsProducts = productsFromStock => {
            const productIdsFromStock = Object.keys(productsFromStock)
            let result = productIdsFromStock.length > 0

            for (const id of productIdsFromStock) {
                if (productIdsFromBasket.indexOf(id) == -1
                    || productsFromStock[id] > this.basketProducts[id].count) {
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

    getDiscountTriggerBirthday(discountType) {
        const stocks = this.stocks.filter(p => p.ConditionType == TriggerType.HappyBirthday
            && p.RewardType == RewardType.Discount
            && p.DiscountType == discountType)
        const discountItem = this.transformDiscount(stocks)

        return discountItem
    }

    transformDiscount(stocks) {
        const discountItem = {
            ids: [],
            discount: 0
        }

        if (stocks.length > 0) {
            switch (this.stockInteractionType) {
                case StockInteractionType.PartialJoin:
                case StockInteractionType.FullExclude: {
                    const maxDiscountValue = getMaxOfArray(stocks.map(p => p.DiscountValue))
                    const maxDiscountStock = stocks.find(p => p.DiscountValue == maxDiscountValue)

                    discountItem.ids.push(maxDiscountStock.Id)
                    discountItem.discount = maxDiscountStock.DiscountValue

                    break
                }
                default: {
                    for (const stock of stocks) {
                        discountItem.ids.push(stock.Id)
                        discountItem.discount += stock.DiscountValue
                    }

                    break
                }
            }
        }

        return discountItem
    }

    getProducts() {
        switch (this.stockInteractionType) {
            case StockInteractionType.FullExclude:
                return this.getProductsByFullExclude()
            default:
                return this.getProductsByFullJoin()
        }
    }

    getProductsByFullJoin = () => {
        const stocksProducts = this.getStockProductsByTriggers()
        let result = []

        for (let item of stocksProducts) {
            if (item.ids.length == 0)
                continue

            result = [...result, ...item.products]
        }

        return result
    }

    getProductsByPartialJoin = () => {
        let result = {
            id: -1,
            price: 0
        }
        const stockIdProducts = this.getProductsByFullJoin()
        const stockIdProductsWithPrice = stockIdProducts.map(p => ({ id: p, price: this.products[p].Price }))
        if (stockIdProductsWithPrice.length) {
            const maxProductPrice = getMaxOfArray(stockIdProductsWithPrice.map(p => p.price))
            const productWithMaxPrice = stockIdProductsWithPrice.find(p => p.price == maxProductPrice)

            result = { ...result, ...productWithMaxPrice }
        }

        return result
    }

    getProductsByFullExclude = () => {
        const productWithMaxPrice = this.getProductsByPartialJoin()

        if (productWithMaxPrice.id != -1) {
            let percentDiscount = this.getDiscountByPartialJoin(DiscountType.Percent)
            const percentDiscountConvertToRuble = parseFloat(this.orderSum) * percentDiscount / 100.0
            let rubleDiscount = this.getDiscountByPartialJoin(DiscountType.Ruble)

            if (productWithMaxPrice.price > percentDiscountConvertToRuble &&
                productWithMaxPrice.price > rubleDiscount) {
                return [productWithMaxPrice.id]
            }
        }

        return []
    }


    getStockProductsByTriggers() {
        const productsTriggerDeliveryType = this.getProductsTriggerDeliveryType()
        const productsTriggerOrderSum = this.getProductsTriggerOrderSum()
        const productsTriggerProducts = this.getProductsTriggerProducts()
        const productsTriggerBirthday = this.getProductsTriggerBirthday()

        return [
            productsTriggerDeliveryType,
            productsTriggerOrderSum,
            productsTriggerProducts,
            productsTriggerBirthday]
    }

    getStocksTriggerDeliveryType() {
        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.DeliveryOrder
            && p.RewardType == RewardType.Products
            && p.ConditionDeliveryType == this.deliveryType)

        return stocks
    }

    getProductsTriggerDeliveryType() {
        const stocks = this.getStocksTriggerDeliveryType()
        const productItem = this.transformStockProducts(stocks)

        return productItem
    }

    filterStockByExcludeProductTriggerOrderSum = stocks => {
        if (!stocks || stocks.length == 0)
            return []

        const newStocks = []
        
        for (const stock of stocks) {
            if (!stock.StockExcludedProducts || stock.StockExcludedProducts.length == 0) {
                newStocks.push(stock)
            } else {
                let orderSumExcludedProducts = 0

                for (const productId of stock.StockExcludedProducts) {
                    const basketProduct = this.basketProducts[productId]

                    if (basketProduct)
                        orderSumExcludedProducts += this.products[productId].Price * basketProduct.count
                }
                const orderSum = this.orderSum - orderSumExcludedProducts

                if (stock.ConditionOrderSum <= orderSum)
                    newStocks.push(stock)
            }
        }

        return newStocks
    }

    getStocksTriggerOrderSum() {
        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.SummOrder
            && p.RewardType == RewardType.Products
            && p.ConditionOrderSum <= this.orderSum)

        stocks = this.filterStockByExcludeProductTriggerOrderSum(stocks)

        return stocks
    }

    getStocksTriggerBirthday() {
        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.HappyBirthday
            && p.RewardType == RewardType.Products)

        return stocks
    }

    getProductsTriggerOrderSum() {
        const stocks = this.getStocksTriggerOrderSum()
        const productItem = this.transformStockProducts(stocks)

        return productItem
    }

    getProductsTriggerBirthday() {
        const stocks = this.getStocksTriggerBirthday()
        const productItem = this.transformStockProducts(stocks)

        return productItem
    }

    getStocksTriggerProducts() {
        const containsProducts = productsFromStock => {
            const productIdsFromStock = Object.keys(productsFromStock)
            const productIdsFromBasket = Object.keys(this.basketProducts)
            let result = productIdsFromStock.length > 0

            for (const id of productIdsFromStock) {
                if (productIdsFromBasket.indexOf(id) == -1
                    || productsFromStock[id] != this.basketProducts[id].count) {
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
        const productItem = this.transformStockProducts(stocks)

        return productItem
    }

    transformStockProducts(stocks) {
        const productItem = {
            ids: [],
            products: []
        }

        if (stocks.length > 0) {
            for (const stock of stocks) {

                productItem.ids.push(stock.Id)
                productItem.products = [...productItem.products, ...stock.AllowedBonusProducts]
            }
        }

        return productItem
    }

    getStockIdsDiscountForCurrentOrder() {
        const stocksDiscountPercent = this.getStockDiscountByTriggers(DiscountType.Percent)
        const stocksDiscountRubel = this.getStockDiscountByTriggers(DiscountType.Ruble)
        return this.getStockIdsForCurrentOrder([...stocksDiscountPercent, ...stocksDiscountRubel])
    }


    getStockIdsProductForCurrentOrder() {
        const stocksProducts = this.getStockProductsByTriggers()
        return this.getStockIdsForCurrentOrder(stocksProducts)
    }

    getStockIdsForCurrentOrder(items) {
        let result = []

        if (items && items.length > 0) {
            for (let item of items) {
                if (item.ids.length == 0) {
                    continue
                }

                result = [...result, ...item.ids]
            }

        }

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
            getMaxOfArray(this.getStocksTriggerProducts().map(p => p.CountBonusProducts)),
            getMaxOfArray(this.getStocksTriggerBirthday().map(p => p.CountBonusProducts)),
        ]

        return getMaxOfArray(counts)
    }
}