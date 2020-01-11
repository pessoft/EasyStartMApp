import React from 'react'
import Style from './style'
import { View, Text, FlatList, TouchableWithoutFeedback, Animated } from 'react-native'
import { StyleTypeIngredient } from '../../../helpers/type-ingredient-style'
import { ShortIngredient } from '../constructor-ingredient/short-ingredient/ShortIngredient'
import { LongIngredient } from '../constructor-ingredient/long-ingredient/LongIngredient'
import Arrow from '../../../images/font-awesome-svg/chevron-down.svg'
import { getSVGColor } from '../../../helpers/color-helper'
import { timingAnimation } from '../../../animation/timingAnimation'

export class ConstructorCategory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowConstructorCategory: true,
      angle: new Animated.Value(1)
    }
  }

  componentDidUpdate() {
    if (this.state.isShowConstructorCategory) {
      timingAnimation(this.state.angle, 1, 200, true)
    } else {
      timingAnimation(this.state.angle, 0, 200, true)
    }
  }

  renderIngredient = ({ item }) => {
    switch (this.props.constructorCategory.StyleTypeIngredient) {
      case StyleTypeIngredient.Short:
        return <ShortIngredient
          style={this.props.style}
          ingredient={item}
          currencyPrefix={this.props.currencyPrefix}

        />
      case StyleTypeIngredient.Long:
        return <LongIngredient
          style={this.props.style}
          ingredient={item}
          currencyPrefix={this.props.currencyPrefix}
        />
    }
  }

  getCountColumn = () => {
    switch (this.props.constructorCategory.StyleTypeIngredient) {
      case StyleTypeIngredient.Short:
        return 2
      case StyleTypeIngredient.Long:
        return 1
    }
  }

  toggleConstructorCategory = () => {
    this.setState({ isShowConstructorCategory: !this.state.isShowConstructorCategory })
  }

  render() {
    const spin = this.state.angle.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    })

    return (
      <View
        style={[
          Style.container,
          this.props.style.theme.backdoor,
          this.props.style.theme.dividerColor
        ]}>
        <TouchableWithoutFeedback onPress={this.toggleConstructorCategory}>
          <View style={[Style.header]}>
            <Text
              style={[
                this.props.style.fontSize.h5,
                this.props.style.theme.primaryTextColor,
              ]}>
              {this.props.constructorCategory.Name}
            </Text>
            <Animated.View
              style={[{ transform: [{ rotate: spin}] }]}
            >
              <Arrow
                key={new Date().getTime().toString()}
                width={20}
                height={20}
                color={getSVGColor(this.props.style.theme.primaryTextColor.color)} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        {
          this.state.isShowConstructorCategory &&
          <View style={[Style.ingredients]}>
            <FlatList
              numColumns={this.getCountColumn()}
              data={this.props.ingredients}
              keyExtractor={item => item.Id.toString()}
              renderItem={this.renderIngredient}
            />
          </View>
        }
      </View>
    )
  }
}