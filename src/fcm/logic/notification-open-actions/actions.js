import {
  PRODUCTS,
  CONSTRUCTOR_PRODUCTS,
  PRODUCT_INFO,
  STOCK_INFO,
  NEWS_INFO,
  PARTNERS_PROFILE,
  CASHBACK_PROFILE,
} from '../../../navigation/pointsNavigate'
import { CategoryType } from '../../../helpers/type-category'

export const NotificationActionType = {
  NoAction: 0,
  OpenCategory: 1,
  OpenProductInfo: 2,
  OpenStock: 3,
  OpenPartners: 4,
  OpenCashback: 5,
  OpenNews: 6,
}

export const openCategory = options => {
  const categories = options.targetItems.filter(p => p.Id == options.targetId)

  if (categories.length == 0)
    return

  const category = categories[0]
  const targetNavigateCategory = category.CategoryType == CategoryType.Constructor ?
    CONSTRUCTOR_PRODUCTS : PRODUCTS

  options.setSelectedProduct({})
  options.setSelectedCategory({})
  options.setSelectedCategory(category)

  options.navigate(targetNavigateCategory)
}

export const openProductInfo = options => {
  if (options.targetId < 1)
    return

  let targetProduct = null
  for (const categoryId in options.targetItems) {
    const products = options.targetItems[categoryId]
    const targetProducts = products.filter(p => p.Id == options.targetId)

    if (targetProducts.length == 0)
      continue
    else {
      targetProduct = targetProducts[0]
      break
    }
  }

  if (!targetProduct)
    return

  options.setSelectedProduct({})
  options.setSelectedProduct(targetProduct)

  options.navigate(PRODUCT_INFO)
}

export const openStock = options => {
  const stocks = options.targetItems.filter(p => p.Id == options.targetId)

  if (stocks.length == 0)
    return

  options.setSelectedNews({})
  options.setSelectedStock(stocks[0])

  options.navigate(STOCK_INFO)
}

export const openNews = options => {
  const news = options.targetItems.filter(p => p.Id == options.targetId)

  if (news.length == 0)
    return

  options.setSelectedStock({})
  options.setSelectedNews(news[0])

  options.navigate(NEWS_INFO)
}

export const openPartners = options => {
  options.navigate(PARTNERS_PROFILE)
}

export const openCashback = options => {
  options.navigate(CASHBACK_PROFILE)
}
