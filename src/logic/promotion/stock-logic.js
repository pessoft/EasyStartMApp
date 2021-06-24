import { TriggerType } from './trigger-type'
import { RewardType } from './reward-type'
import { DiscountType } from './discount-type'
import { getMaxOfArray, getMinOfArray } from '../../helpers/utils'
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
        this.additionalOptions = stockOption.additionalOptions
        this.additionalFillings = stockOption.additionalFillings
    }

    getDiscount = (discountType, withStockIds = false) => {
        switch (this.stockInteractionType) {
            case StockInteractionType.PartialJoin:
                return this.getDiscountByPartialJoin(discountType, withStockIds)
            case StockInteractionType.FullExclude:
                return this.getDiscountByFullExclude(discountType, withStockIds)
            default:
                return this.getDiscountByFullJoin(discountType, withStockIds)
        }
    }

    getPartialDiscount = discountType => {
        switch (this.stockInteractionType) {
            case StockInteractionType.PartialJoin:
                return this.getPartialDiscountByPartialJoin(discountType)
            case StockInteractionType.FullExclude:
                return this.getPartialDiscountByFillExcluded(discountType)
            default:
                return this.getDiscountTriggerProducts(discountType)
        }
    }

    getPartialDiscountByPartialJoin = discountType => {
        const discount = this.getDiscountByPartialJoin(discountType)

        if (discount > 0)
            return []

        const stockPartialDiscountPercent = this.getDiscountTriggerProducts(DiscountType.Percent)
        const stockPartialDiscountRubel = this.getDiscountTriggerProducts(DiscountType.Ruble)
        const maxPartialDiscountPercentByRubel = getMaxOfArray(stockPartialDiscountPercent.map(p => p.discountValueCurrency))
        const maxPartialDiscountRubel = parseFloat(getMaxOfArray(stockPartialDiscountRubel.map(p => p.discountValueCurrency)))
        let maxDiscountValueCurrency

        if (discountType == DiscountType.Percent &&
            maxPartialDiscountPercentByRubel >= maxPartialDiscountRubel)
            maxDiscountValueCurrency = stockPartialDiscountPercent.find(p => p.discountValueCurrency == maxPartialDiscountPercentByRubel)
        else if (discountType == DiscountType.Ruble &&
            maxPartialDiscountRubel > maxPartialDiscountPercentByRubel)
            maxDiscountValueCurrency = stockPartialDiscountRubel.find(p => p.discountValueCurrency == maxPartialDiscountRubel)

        return maxDiscountValueCurrency ? [maxDiscountValueCurrency] : []
    }

    getPartialDiscountByFillExcluded = discountType => {
        const discount = this.getDiscountByFullExclude(discountType)
        const productsWithPaxPrice = this.getProductsByFullExclude()

        if (discount > 0 || productsWithPaxPrice.length)
            return []
        else
            return this.getPartialDiscountByPartialJoin(discountType)
    }

    getDiscountByFullJoin = (discountType, withStockIds = false) => {
        const stocksDiscount = this.getStockDiscountByTriggers(discountType)
        let result = withStockIds ? { ids: [], discount: 0 } : 0

        const stockAggregator = data => {
            if (withStockIds) {
                result.discount += data.discount
                result.ids = [...result.ids, ...data.ids]
            } else {
                result += data.discount
            }
        }

        for (let item of stocksDiscount) {
            if (item.ids.length == 0)
                continue

            stockAggregator(item)
        }

        return result
    }

    getDiscountByPartialJoin = (discountType, withStockIds = false) => {
        const stocksDiscountPercent = this.getStockDiscountByTriggers(DiscountType.Percent)
        const stocksDiscountRubel = this.getStockDiscountByTriggers(DiscountType.Ruble)
        const maxDiscountPercent = getMaxOfArray(stocksDiscountPercent.map(p => p.discount))
        const maxDiscountRubel = parseFloat(getMaxOfArray(stocksDiscountRubel.map(p => p.discount)))
        const maxDiscountPercentConvertToRubel = parseFloat(this.orderSum) * maxDiscountPercent / 100.0

        const stockPartialDiscountPercent = this.getDiscountTriggerProducts(DiscountType.Percent)
        const stockPartialDiscountRubel = this.getDiscountTriggerProducts(DiscountType.Ruble)
        const maxPartialDiscountPercentByRubel = getMaxOfArray(stockPartialDiscountPercent.map(p => p.discountValueCurrency))
        const maxPartialDiscountRubel = parseFloat(getMaxOfArray(stockPartialDiscountRubel.map(p => p.discountValueCurrency)))

        if (discountType == DiscountType.Percent &&
            maxDiscountPercentConvertToRubel >= maxDiscountRubel &&
            maxDiscountPercentConvertToRubel >= maxPartialDiscountPercentByRubel &&
            maxDiscountPercentConvertToRubel >= maxPartialDiscountRubel) {
            if (withStockIds) {
                const findStocks = stocksDiscountPercent.filter(p => p.discount == maxDiscountPercent)

                return {
                    ids: findStocks.length > 0 ? findStocks[0].ids : [],
                    discount: maxDiscountPercent
                }
            } else
                return maxDiscountPercent
        }
        else if (discountType == DiscountType.Ruble &&
            maxDiscountRubel > maxDiscountPercentConvertToRubel &&
            maxDiscountRubel > maxPartialDiscountPercentByRubel &&
            maxDiscountRubel > maxPartialDiscountRubel) {
            if (withStockIds) {
                const findStocks = stocksDiscountRubel.filter(p => p.discount == maxDiscountRubel)

                return {
                    ids: findStocks.length > 0 ? findStocks[0].ids : [],
                    discount: maxDiscountRubel
                }
            } else
                return maxDiscountRubel
        }


        return withStockIds ? { ids: [], discount: 0 } : 0
    }

    getDiscountByFullExclude = (discountType, withStockIds = false) => {
        const productsWithPaxPrice = this.getProductsByFullExclude()

        if (productsWithPaxPrice.length) {
            if (withStockIds) {
                return {
                    ids: [],
                    discount: 0
                }
            } else
                return 0
        }
        else
            return this.getDiscountByPartialJoin(discountType, withStockIds)
    }

    getStockDiscountByTriggers(discountType) {
        const discountTriggerDeliveryType = this.getDiscountTriggerDeliveryType(discountType)
        const discountTriggerOrderSum = this.getDiscountTriggerOrderSum(discountType)
        const discountTriggerBirthday = this.getDiscountTriggerBirthday(discountType)

        return [
            discountTriggerDeliveryType,
            discountTriggerOrderSum,
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

        let stocks = this.stocks.filter(p => p.ConditionType == TriggerType.ProductsOrder
            && p.RewardType == RewardType.Discount
            && p.DiscountType == discountType
            && containsProducts(p.ConditionCountProducts))
        stocks = this.transformPartialDiscount(stocks)

        const discountItems = this.getPartialDiscountValues(stocks, discountType)

        return discountItems
    }

    getDiscountValueCurrency = (discountValue, productPrice, multiplier, discountType) => {
        const price = productPrice * multiplier
        let discountValueCurrency = 0

        if (discountType == DiscountType.Percent) {
            discountValueCurrency = price * discountValue / 100
        } else {
            discountValueCurrency = discountValue
        }

        return discountValueCurrency
    }

    getPartialDiscountValues = (stocks, discountType) => {
        const discountItems = []

        if (stocks && stocks.length > 0) {
            for (const stock of stocks) {
                const countConditions = []
                let productsPrice = 0
                for (const id in stock.ConditionCountProducts) {
                    const conditionProductCount = stock.ConditionCountProducts[id]
                    const basketProductCount = this.basketProducts[id].count
                    const countRepeatConditionProduct = basketProductCount / conditionProductCount

                    productsPrice += this.products[id].Price
                    countConditions.push(countRepeatConditionProduct)
                }
                const multiplier = getMinOfArray(countConditions)
                discountItems.push({
                    stockId: stock.Id,
                    discount: stock.DiscountValue,
                    discountValueCurrency: this.getDiscountValueCurrency(stock.DiscountValue, productsPrice, multiplier, discountType)
                })
            }
        }

        return discountItems
    }

    transformPartialDiscount(stocks) {
        let _stocks = []

        if (stocks.length > 0) {
            switch (this.stockInteractionType) {
                case StockInteractionType.PartialJoin:
                case StockInteractionType.FullExclude:
                    const maxDiscountValue = getMaxOfArray(stocks.map(p => p.DiscountValue))
                    const maxDiscountStock = stocks.find(p => p.DiscountValue == maxDiscountValue)

                    _stocks.push(maxDiscountStock)
                    break
                default:
                    _stocks = stocks
                    break;
            }
        }

        return _stocks
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

    getProductPriceForStockProducts = product => {
        let price = product.Price

        if(product.ProductAdditionalOptionIds.length) {
            for(const id of product.ProductAdditionalOptionIds) {
                const additionalOption = this.additionalOptions[id]
                const additionalOptionItem = additionalOption.Items.find(p => p.IsDefault)

                price += additionalOptionItem.Price
            }
        }

        return price
    }

    getProductsByPartialJoin = () => {
        let result = {
            id: -1,
            price: 0
        }
        const stockIdProducts = this.getProductsByFullJoin()
        const stockIdProductsWithPrice = stockIdProducts.map(p => ({ id: p, price: this.getProductPriceForStockProducts(this.products[p]) }))
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

            const percentPartialDiscount = this.getPartialDiscountByPartialJoin(DiscountType.Percent)
            const rubelPartialDiscount = this.getPartialDiscountByPartialJoin(DiscountType.Ruble)
            const maxPartialPercentRubelDiscountCurrency = getMaxOfArray(percentPartialDiscount.map(p => p.discountValueCurrency))
            const maxPartialRubelDiscountCurrency = getMaxOfArray(rubelPartialDiscount.map(p => p.discountValueCurrency))
            
            if (productWithMaxPrice.price > percentDiscountConvertToRuble &&
                productWithMaxPrice.price > rubleDiscount &&
                productWithMaxPrice.price > maxPartialPercentRubelDiscountCurrency &&
                productWithMaxPrice.price > maxPartialRubelDiscountCurrency) {
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
        const stocksDiscountPercent = this.getDiscount(DiscountType.Percent, true)
        const stocksDiscountRubel = this.getDiscount(DiscountType.Ruble, true)
        let stocksPartialDiscountPercent = this.getPartialDiscount(DiscountType.Percent)
        stocksPartialDiscountPercent = { ids: stocksPartialDiscountPercent.map(p => p.stockId) }
        let stocksPartialDiscountRubel = this.getPartialDiscount(DiscountType.Ruble)
        stocksPartialDiscountRubel = { ids: stocksPartialDiscountRubel.map(p => p.stockId) }

        return this.getStockIdsForCurrentOrder([
            stocksDiscountPercent,
            stocksDiscountRubel,
            stocksPartialDiscountPercent,
            stocksPartialDiscountRubel
        ])
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

    /**
     * Если в процентной скидке есть фильтр на исключение блюд
     * то тут по каждой скидке считаем процент в рублях исключая стоимость блюд указаных в фильтре,
     * таким образом процент применяется только к той сумме в которую входят только разрешенные продукты для этой скидки 
     *
     */
     getDetailsInfoDiscountPercentByStockIds(ids) {
        var targetStocks = this.stocks.filter(p => ids.includes(p.Id)
            && p.StockExcludedProducts && p.StockExcludedProducts.length
            && p.DiscountType == DiscountType.Percent)
        var result = []

        if (targetStocks.length) {
            for (const stock of targetStocks) {
                let orderSumExcludedProducts = 0

                for (const productId of stock.StockExcludedProducts) {
                    const basketProduct = this.basketProducts[productId]

                    if (basketProduct)
                        orderSumExcludedProducts += this.products[productId].Price * basketProduct.count
                }

                const orderSum = this.orderSum - orderSumExcludedProducts

                result.push({
                    percent: stock.DiscountValue,
                    discountValueRuble: (orderSum * stock.DiscountValue) / 100
                })
            }
        }

        return result
    }
}