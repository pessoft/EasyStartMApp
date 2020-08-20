import React from 'react'
import {
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions
} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import { connect } from 'react-redux'
import { ButtonWithoutFeedback } from '../../buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'
import { ProductAdditionalInfoType, ProductAdditionalInfoTypeShortName } from '../../../helpers/product-additional-option'
import SwitchSelector from "react-native-switch-selector"

const height = Dimensions.get('window').height - 64

class ProductWithOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {},
      optionsAdditionalInfo: {},//key - productAdditionalOptionId, value - productAdditionalOptionItemId
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.toggle && this.props.toggle && this.ProductWithOptions) {
      this.show()
    }
    else if (prevProps.toggle && !this.props.toggle && this.ProductWithOptions)
      this.ProductWithOptions.close()
  }

  show = () => {
    const product = this.props.productDictionary[this.props.productId]
    const optionsAdditionalInfo = this.initOptionsAdditionalInfo(product)

    this.setState({ product, optionsAdditionalInfo })
    this.ProductWithOptions.open()
  }

  onClose = () => {
    this.setState({ product: {} })

    if (this.props.close) {
      this.props.close()
    }
  }

  initOptionsAdditionalInfo = product => {
    const optionsAdditionalInfo = {}

    for (const id of product.ProductAdditionalOptionIds) {
      const defaultItemId = this.props.additionalOptions[id].Items.find(p => p.IsDefault).Id
      optionsAdditionalInfo[id] = defaultItemId
    }

    return optionsAdditionalInfo
  }

  getPrice = () => {
    let price = this.state.product.Price

    if (Object.keys(this.state.optionsAdditionalInfo).length) {
      for (const id in this.state.optionsAdditionalInfo) {
        const itemId = this.state.optionsAdditionalInfo[id]
        const item = this.props.additionalOptions[id].Items.find(p => p.Id == itemId)

        price += item.Price
      }
    }

    return price
  }

  getPriceStr = () => `${this.getPrice()} ${this.props.currencyPrefix}`

  getAdditionalInfo = () => {
    let additionalInfo
    const productAdditionalInfoType = this.state.product.ProductAdditionalInfoType

    if (productAdditionalInfoType != ProductAdditionalInfoType.Custom) {
      additionalInfoValue = parseFloat(this.state.product.AdditionInfo)

      if (Object.keys(this.state.optionsAdditionalInfo).length) {
        for (const id in this.state.optionsAdditionalInfo) {
          const itemId = this.state.optionsAdditionalInfo[id]
          const item = this.props.additionalOptions[id].Items.find(p => p.Id == itemId)

          additionalInfoValue += item.AdditionalInfo
        }
      }

      const productAdditionalInfoPrefix = ProductAdditionalInfoTypeShortName[productAdditionalInfoType]
      additionalInfo = `${additionalInfoValue} ${productAdditionalInfoPrefix}`

    } else
      additionalInfo = this.state.product.AdditionInfo

    return additionalInfo
  }

  getButtonText = () => {
    return `В корзину за ${this.getPriceStr()}`
  }

  renderOptionsAdditionalInfo = additionalOptionId => {
    const additionalOption = this.props.additionalOptions[additionalOptionId]

    if (additionalOption.Items.length < 3)
      return this.renderSwitchSelectorOptionsAdditionalInfo(additionalOption)
    else
      return this.renderCheckBoxListOptionsAdditionalInfo(additionalOption)
  }

  renderSwitchSelectorOptionsAdditionalInfo = additionalOption => {
    const options = additionalOption.Items.map(p => { return { label: p.Name, value: p.Id, additionalOptionId: additionalOption.Id} })
    const initial = this.state.optionsAdditionalInfo[additionalOption.Id]
    const initialIndex = options.findIndex(p => p.value == initial)

    return <SwitchSelector
      key={additionalOption.Id.toString()}
      options={options}
      initial={initialIndex}
      height={32}
      borderRadius={3}
      fontSize={this.props.style.fontSize.h10.fontSize}
      bold={false}
      textColor={this.props.style.theme.primaryTextColor.color}
      selectedColor={this.props.style.theme.textPrimaryColor.color}
      backgroundColor={this.props.style.theme.backdoor.backgroundColor}
      buttonColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
      style={{ marginBottom: 8, borderWidth: 1, borderRadius: 4, borderColor: this.props.style.theme.darkPrimaryColor.backgroundColor }}
      returnObject={true}
      // onPress={this.onChangePaymentType}
    />
  }

  renderCheckBoxListOptionsAdditionalInfo = additionalOption => {

  }

  render() {
    return (
      <RBSheet
        ref={ref => {
          this.ProductWithOptions = ref;
        }}
        closeOnDragDown
        animationType='fade'
        height={height}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: this.props.style.theme.backdoor.backgroundColor,
          }
        }}
        onClose={this.onClose}
      >

        <ScrollView style={Style.container} contentOffset={{ y: 50 }}>
          <TouchableOpacity activeOpacity={1}>
            <Image
              style={Style.image}
              source={this.state.product.Image}
            />

            <View style={Style.productBaseInfo}>
              <Text style={[
                this.props.style.theme.dividerColor,
                this.props.style.fontSize.h4,
                this.props.style.theme.primaryTextColor]}>
                {this.state.product.Name}
              </Text>
              <Text style={[
                Style.additionalInfo,
                this.props.style.theme.dividerColor,
                this.props.style.fontSize.h9,
                this.props.style.theme.secondaryTextColor]}>
                {this.getAdditionalInfo()}
              </Text>
              <Text style={[
                this.props.style.theme.dividerColor,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor]}>
                {this.state.product.Description}
              </Text>
            </View>
            <View>
              {Object.keys(this.state.product).length &&
                this.state.product.ProductAdditionalOptionIds.map(p => this.renderOptionsAdditionalInfo(p))}
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={Style.productOptions}>
          <ButtonWithoutFeedback
            text={this.getButtonText()}
            style={this.props.style}
            backgroundColor={this.props.style.theme.accentColor.backgroundColor}
            borderRadius={5}
          // onPress={this.login}
          />
        </View>

      </RBSheet>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    productDictionary: state.main.productDictionary,
    currencyPrefix: state.appSetting.currencyPrefix,
    additionalOptions: state.main.additionalOptions,
    additionalFillings: state.main.additionalFillings,
  }
}

export default connect(mapStateToProps)(ProductWithOptions)