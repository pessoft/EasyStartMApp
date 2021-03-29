import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
import Style from './style'
import { endingStrByNumber } from '../../../helpers/utils'
import { ProductBonusItem } from '../../product/ProductBonusItem';
import { ProductAdditionalInfoTypeShortName, ProductAdditionalInfoType } from '../../../helpers/product-additional-option'

export class BonusProducts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: this.props.allowedCountSelect
    }
  }

  componentDidMount = () => {
    const bonusProductCount = this.props.bonusProductIds.length

    if (this.state.limit != 0 && bonusProductCount == 1) {
      const product = {
        count: 1,
        id: this.props.bonusProductIds[0]
      }

      this.toggleProduct(product)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.allowedCountSelect != this.props.allowedCountSelect) {
      let limit = this.props.allowedCountSelect
      limit -= this.props.selectedProductsBonus.length

      this.setState({ limit })
    }
  }

  getHeaderText = () => {
    const countProduct = this.props.allowedCountSelect
    const presentWorlds = ['подарок', 'подарка', 'подарков']
    const present = endingStrByNumber(countProduct, presentWorlds)
    const text = `Выберите ${countProduct} ${present}`

    return text
  }

  getProducts = () => {
    let result = []

    for (const id of this.props.bonusProductIds) {
      for (const categoryId in this.props.products) {
        const products = this.props.products[categoryId]
        const findProducts = products.filter(p => p.Id == id)

        if (findProducts.length > 0) {
          result.push(findProducts[0])
          break
        }
      }
    }

    return result
  }

  getAdditionalInfo = product => {
    let additionalInfo
    const productAdditionalInfoType = product.ProductAdditionalInfoType

    if (productAdditionalInfoType != ProductAdditionalInfoType.Custom) {
      additionalInfoValue = parseFloat(product.AdditionInfo)

      if (product.ProductAdditionalOptionIds.length) {
        for (const id of product.ProductAdditionalOptionIds) {
          const additionalOption = this.props.additionalOptions[id]
          const additionalOptionItem = additionalOption.Items.find(p => p.IsDefault)

          additionalInfoValue += additionalOptionItem.AdditionalInfo
        }
      }

      const productAdditionalInfoPrefix = ProductAdditionalInfoTypeShortName[productAdditionalInfoType]
      additionalInfo = `${additionalInfoValue} ${productAdditionalInfoPrefix}`

    } else
      additionalInfo = product.AdditionInfo

    return additionalInfo
  }

  productsTransform = () => {
    const productsForRender = []
    const products = this.getProducts()

    for (let item of products) {
      let countProduct = 0
      if (this.props.selectedProductsBonus.indexOf(item.Id) != -1) {
        countProduct = 1
      }

      productsForRender.push({
        key: `${item.Id}-${countProduct}`,
        id: item.Id,
        product: {
          caption: item.Name,
          imageSource: item.Image,
          additionInfo: this.getAdditionalInfo(item),
          price: 0,
          currencyPrefix: this.props.currencyPrefix,
          startCount: countProduct,
          productType: item.ProductType,
        },
      })
    }

    return productsForRender
  }

  renderItem = item => {
    return <ProductBonusItem
      backgroundColor={this.props.style.theme.themeBody.backgroundColor}
      style={this.props.style}
      animation={item.animation}
      id={item.id}
      key={item.key}
      product={item.product}
      limit={this.state.limit}
      maxCount={1}
      onToggleProduct={this.toggleProduct}
    />
  }

  toggleProduct = product => {
    let products = []
    const onChangeCallback = () => {
      if (this.props.onChangeBonusProducts)
        this.props.onChangeBonusProducts(products)
    }

    if (product.count > 0) {
      products = [...this.props.selectedProductsBonus, product.id]

      if (this.state.limit > 0)
        this.setState({ limit: this.state.limit - 1 }, onChangeCallback)
    } else {
      for (const id of this.props.selectedProductsBonus) {
        if (product.id != id)
          products.push(id)
      }

      this.setState({ limit: this.state.limit + 1 }, onChangeCallback)
    }
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            {this.getHeaderText()}
          </Text>
        </View>
        <View
          style={Style.content}
        >
         {this.productsTransform().map(p => this.renderItem(p))}
        </View>
      </View>
    )
  }
}