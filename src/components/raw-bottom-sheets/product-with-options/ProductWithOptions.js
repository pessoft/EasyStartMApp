import React from 'react'
import {
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  Platform
} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import { connect } from 'react-redux'
import { ButtonWithoutFeedback } from '../../buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'
import { ProductAdditionalInfoType, ProductAdditionalInfoTypeShortName } from '../../../helpers/product-additional-option'
import SwitchSelector from 'react-native-switch-selector'
import { RadioGroup } from '../../radio-group/RadioGroup'
import { ToggleSwitch } from '../../toggle-switch/ToggleSwitch'
import { generateRandomString, containsSubarray } from '../../../helpers/utils'
import LottieView from 'lottie-react-native'
import { timingAnimation } from '../../../animation/timingAnimation'


const height = Dimensions.get('window').height - 64

class ProductWithOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {},
      optionsAdditionalInfo: {},//key - productAdditionalOptionId, value - productAdditionalOptionItemId
      fillingAdditionalInfo: {},//key - productAdditionalFillingId, value - bool isSelected
      showSuccessAnimation: false,
      foreverDisabledAdditionalOptionItems: {}
    }
  }

  //allowCombination = [[],[],...]
  getForeverDisabledAdditionalOptionItems = (productAdditionalOptionIds, allowCombinations) => {
    let foreverDisabledAdditionalOptionItems = []
    const uniqItemsFromCombinations = {}

    if (allowCombinations && allowCombinations.length > 0) {

      for (const items of allowCombinations)
        for (const item of items)
          uniqItemsFromCombinations[item] = item

      for (const id of productAdditionalOptionIds) {
        const additionalOption = this.props.additionalOptions[id]
        const offItemIds = additionalOption.Items.filter(p => !uniqItemsFromCombinations[p.Id]).map(p => p.Id)

        foreverDisabledAdditionalOptionItems = [...foreverDisabledAdditionalOptionItems, ...offItemIds]
      }
    }

    return foreverDisabledAdditionalOptionItems.reduce((acc, v) => {
      acc[v] = v
      return acc
    }, {})
  }

  showSuccessAnimation = () => this.setState({ showSuccessAnimation: true })
  hideSuccessAnimation = callback => this.setState({ showSuccessAnimation: false }, callback)

  delayFunc = func => {
    if (func) {
      setTimeout(func, 200)
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
    const foreverDisabledAdditionalOptionItems = this.getForeverDisabledAdditionalOptionItems(product.ProductAdditionalOptionIds, product.AllowCombinations)

    this.setState({ product, optionsAdditionalInfo, fillingAdditionalInfo, foreverDisabledAdditionalOptionItems })
    this.ProductWithOptions.open()
  }

  onClose = () => {
    this.setState({
      product: {},
      optionsAdditionalInfo: {},
      fillingAdditionalInfo: {},
      showSuccessAnimation: false,
      foreverDisabledAdditionalOptionItems: []
    })

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
    const updateOptionsAdditionalInfo = { ...this.state.optionsAdditionalInfo }
    updateOptionsAdditionalInfo[selectOption.additionalOptionId] = selectOption.value
    const optionIndex = this.state.product.ProductAdditionalOptionIds.findIndex(p => p == selectOption.additionalOptionId)
    const optionsAdditionalInfo = this.getValidCombination(updateOptionsAdditionalInfo, optionIndex)

    this.setState({ optionsAdditionalInfo })
  }

  getValidCombination = (optionsAdditionalInfo, targetOptionIndex) => {
    if (this.state.product.AllowCombinations && this.state.product.AllowCombinations.length > 0) {
      const currentCombination = this.state.product.ProductAdditionalOptionIds.map(p => optionsAdditionalInfo[p])
      let isValidCombination = false
      const subCombinationForFindValid = [currentCombination[targetOptionIndex]]
      let validCombination = []

      for (const allowCombination of this.state.product.AllowCombinations) {
        const startIndexSubarray = containsSubarray(allowCombination, currentCombination)

        if (startIndexSubarray >= 0) {
          isValidCombination = true
          break
        } else if (validCombination.length == 0) {
          const startIndexValidCombination = containsSubarray(allowCombination, subCombinationForFindValid)

          if (startIndexValidCombination >= 0)
            validCombination = allowCombination
        }
      }

      if (!isValidCombination) {
        const newOptionsAdditionalInfo = {}

        for (let i = 0; i < this.state.product.ProductAdditionalOptionIds.length; ++i) {
          const optionId = this.state.product.ProductAdditionalOptionIds[i]
          const selectItemId = validCombination[i]

          newOptionsAdditionalInfo[optionId] = selectItemId
        }

        return newOptionsAdditionalInfo
      }
    }

    return optionsAdditionalInfo
  }

  getOptionsForControls = additionalOption => {
    return additionalOption.Items.map(p => { return { label: p.Name, value: p.Id, additionalOptionId: additionalOption.Id } })
  }

  isDisabledSwitchSelector = (additionalOptionId, v) => {
    let isDisabled = false

    return isDisabled
  }

  getDisabledOptionItems = (optionIndex, additionalOption, optionsAdditionalInfo) => {
    let prevCombination = []
    optionsAdditionalInfo = optionsAdditionalInfo || this.state.optionsAdditionalInfo
    for (let i = 0; i < optionIndex; ++i) {
      const optionId = this.state.product.ProductAdditionalOptionIds[i]
      prevCombination.push(optionsAdditionalInfo[optionId])
    }

    const disabledItems = []
    for (const item of additionalOption.Items) {
      const tmpCombination = [...prevCombination, item.Id]

      let isItemDisabled = true
      for (const allowCombination of this.state.product.AllowCombinations) {
        const startIndexSubarray = containsSubarray(allowCombination, tmpCombination)

        if (startIndexSubarray >= 0) {
          isItemDisabled = false
          break
        }
      }

      if (isItemDisabled)
        disabledItems.push(item.Id)
    }

    return disabledItems
  }

  renderSwitchSelectorOptionsAdditionalInfo = additionalOption => {
    const additionalOptionId = additionalOption.Id
    const optionIndex = this.state.product.ProductAdditionalOptionIds.findIndex(p => p == additionalOptionId)
    const options = this.getOptionsForControls(additionalOption)
    const initial = this.state.optionsAdditionalInfo[additionalOption.Id]
    const initialIndex = options.findIndex(p => p.value == initial)
    let isForeverDisabled = false
    let isDisabled = false

    for (const option of options) {
      isForeverDisabled = !!this.state.foreverDisabledAdditionalOptionItems[option.value]

      if (isForeverDisabled)
        break
    }

    if (optionIndex > 0 && this.state.product.AllowCombinations && this.state.product.AllowCombinations.length) {

      const disabledItems = this.getDisabledOptionItems(optionIndex, additionalOption)
      isDisabled = disabledItems.length > 0
    }

    isDisabled = isForeverDisabled || isDisabled

    return <SwitchSelector
      key={additionalOption.Id.toString()}
      disabled={isDisabled}
      options={options}
      initial={initialIndex}
      value={initialIndex}
      height={32}
      borderRadius={3}
      fontSize={this.props.style.fontSize.h10.fontSize}
      bold={false}
      textColor={this.getTextColorForSwitchSelector(isDisabled)}
      selectedColor={this.props.style.theme.textPrimaryColor.color}
      backgroundColor={this.props.style.theme.backdoor.backgroundColor}
      buttonColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
      style={{ marginBottom: 8, borderWidth: 1, borderRadius: 4, borderColor: this.props.style.theme.darkPrimaryColor.backgroundColor }}
      returnObject={true}
      onPress={this.onChangeProductAdditionalOption}
    />
  }

  getTextColorForSwitchSelector = (isDisabled) => {
    if (isDisabled) {
      if (this.props.style.theme.disabledTextColor)
        return this.props.style.theme.disabledTextColor.color

      this.props.style.theme.secondaryTextColor.color
    }

    return this.props.style.theme.primaryTextColor.color
  }

  renderCheckBoxListOptionsAdditionalInfo = additionalOption => {
    const additionalOptionId = additionalOption.Id
    const optionIndex = this.state.product.ProductAdditionalOptionIds.findIndex(p => p == additionalOptionId)
    const options = this.getOptionsForControls(additionalOption)
    const initial = this.state.optionsAdditionalInfo[additionalOption.Id]
    let disabledItems = []

    if (optionIndex > 0 && this.state.product.AllowCombinations && this.state.product.AllowCombinations.length) {
      disabledItems = this.getDisabledOptionItems(optionIndex, additionalOption)
    }

    for (const option of options) {
      const isForeverDisabled = !!this.state.foreverDisabledAdditionalOptionItems[option.value]

      if (isForeverDisabled)
        option.disabled = true
      else {
        const index = disabledItems.findIndex(p => p == option.value)
        options.disabled = index != -1
      }
    }

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
          value={initial}
          returnObject={true}
          changeRadio={this.onChangeProductAdditionalOption}
          style={this.props.style}
        />
      </View>
    )
  }

  renderAdditionalFillingInfo = () => {
    return (
      <View style={[this.props.style.theme.themeBody, Style.groupWrapper, Style.additionalFillingGroup]}>
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
      backgroundColor={Platform.OS == 'android' ? this.props.style.theme.themeBody.backgroundColor : null}
      trackColorFalse={Platform.OS == 'android' ? this.props.style.theme.backdoor.backgroundColor : null}
    />
  }

  onToggleAdditionalFilling = (id, value) => {
    const fillingAdditionalInfo = { ...this.state.fillingAdditionalInfo }
    fillingAdditionalInfo[id] = value

    this.setState({ fillingAdditionalInfo })
  }

  getSelectedAdditionalFillings = () => {
    const ids = []

    for (const id in this.state.fillingAdditionalInfo) {
      if (this.state.fillingAdditionalInfo[id])
        ids.push(id)
    }

    return ids
  }

  onToggleProduct = () => {
    if (this.props.onToggleProduct) {
      const productForBasket = {
        uniqId: generateRandomString(),
        count: 1,
        productId: this.props.productId,
        additionalOptions: this.state.optionsAdditionalInfo,
        additionalFillings: this.getSelectedAdditionalFillings(),
      }

      this.props.onToggleProduct(productForBasket)
    }

    this.showSuccessAnimation()
  }

  onSuccessAnimationFinish = () => {
    const closeFunc = () => this.ProductWithOptions.close()
    const func = () => this.hideSuccessAnimation(closeFunc)

    this.delayFunc(func)
  }

  getAdditionalFillingInfo = () => {
    if (Object.keys(this.state.product).length &&
      this.state.product.ProductAdditionalFillingIds.length)
      return this.renderAdditionalFillingInfo()
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
        {
          this.state.showSuccessAnimation &&
          <View style={Style.successContainer}>
            <View style={Style.success}>
              <LottieView
                style={Style.loader}
                source={require('../../../animation/src/success-2.json')}
                autoPlay
                loop={false}
                onAnimationFinish={this.onSuccessAnimationFinish}
                resizeMode='contain'
                speed={1} />
            </View>
          </View>
        }
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
            {this.getAdditionalFillingInfo()}
          </TouchableOpacity>
        </ScrollView>
        <View style={[Style.productOptionsBtnBasket]}>
          <ButtonWithoutFeedback
            text={this.getButtonText()}
            style={this.props.style}
            backgroundColor={this.props.style.theme.accentColor.backgroundColor}
            borderRadius={5}
            onPress={this.onToggleProduct}
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