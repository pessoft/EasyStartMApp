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
import SwitchSelector from 'react-native-switch-selector'
import { RadioGroup } from '../../radio-group/RadioGroup'
import { ToggleSwitch } from '../../toggle-switch/ToggleSwitch'

const height = Dimensions.get('window').height - 64

class ProductWithOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {},
      optionsAdditionalInfo: {},//key - productAdditionalOptionId, value - productAdditionalOptionItemId
      fillingAdditionalInfo: {},//key - productAdditionalFillingId, value - bool isSelected
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
    const fillingAdditionalInfo = this.initAdditionalFillingInfo(product)

    this.setState({ product, optionsAdditionalInfo, fillingAdditionalInfo })
    this.ProductWithOptions.open()
  }

  onClose = () => {
    this.setState({ product: {}, optionsAdditionalInfo: {}, fillingAdditionalInfo: {} })

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

  initAdditionalFillingInfo = product => {
    const fillingAdditionalInfo = {}

    for (const id of product.ProductAdditionalFillingIds) {
      fillingAdditionalInfo[id] = false
    }

    return fillingAdditionalInfo
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

    if (Object.keys(this.state.fillingAdditionalInfo).length) {
      for (const id in this.state.fillingAdditionalInfo) {
        const isSelected = this.state.fillingAdditionalInfo[id]

        if (isSelected) {
          const additionalFilling = this.props.additionalFillings[id]

          price += additionalFilling.Price
        }
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

  onChangeProductAdditionalOption = selectOption => {
    const optionsAdditionalInfo = { ...this.state.optionsAdditionalInfo }
    optionsAdditionalInfo[selectOption.additionalOptionId] = selectOption.value

    this.setState({ optionsAdditionalInfo })
  }

  getOptionsForControls = additionalOption => {
    return additionalOption.Items.map(p => { return { label: p.Name, value: p.Id, additionalOptionId: additionalOption.Id } })
  }

  renderSwitchSelectorOptionsAdditionalInfo = additionalOption => {
    const options = this.getOptionsForControls(additionalOption)
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
      onPress={this.onChangeProductAdditionalOption}
    />
  }

  renderCheckBoxListOptionsAdditionalInfo = additionalOption => {
    const options = this.getOptionsForControls(additionalOption)
    const initial = this.state.optionsAdditionalInfo[additionalOption.Id]

    return (
      <View
        style={[this.props.style.theme.themeBody, Style.groupWrapper]}
        key={additionalOption.Id.toString()}
      >
        <Text
          style={[
            Style.groupLabel,
            this.props.style.fontSize.h7,
            this.props.style.theme.primaryTextColor]}>
          {additionalOption.Name}
        </Text>
        <RadioGroup
          radioProps={options}
          initValue={initial}
          returnObject={true}
          changeRadio={this.onChangeProductAdditionalOption}
          style={this.props.style}
        />
      </View>
    )
  }



  renderAdditionalFillingInfo = () => {
    return (
      <View style={[this.props.style.theme.themeBody, Style.groupWrapper]}>
        <Text style={[
          Style.groupLabel,
          this.props.style.fontSize.h7,
          this.props.style.theme.primaryTextColor]}>
          Дополнительные опции
              </Text>
        {this.state.product.ProductAdditionalFillingIds.map(p => this.renderAdditionalFillingItem(p))}
      </View>
    )
  }

  renderAdditionalFillingItem = id => {
    const additionalFilling = this.props.additionalFillings[id]
    const label = `${additionalFilling.Name} +${additionalFilling.Price} ${this.props.currencyPrefix}`
    return <ToggleSwitch
      key={id.toString()}
      id={id}
      label={label}
      value={this.state.fillingAdditionalInfo[id]}
      onToggle={this.onToggleAdditionalFilling}
      style={this.props.style}
    />
  }

  onToggleAdditionalFilling = (id, value) => {
    const fillingAdditionalInfo = { ...this.state.fillingAdditionalInfo }
    fillingAdditionalInfo[id] = value

    this.setState({ fillingAdditionalInfo })
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

        <ScrollView style={Style.container} contentOffset={{ y: 110 }}>
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
            {Object.keys(this.state.product).length &&
              this.state.product.ProductAdditionalFillingIds.length &&
              this.renderAdditionalFillingInfo()}
          </TouchableOpacity>
        </ScrollView>
        <View style={[Style.productOptionsBtnBasket]}>
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