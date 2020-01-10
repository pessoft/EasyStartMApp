import React from 'react'
import Style from './style'
import { View, Text, FlatList } from 'react-native'
import { StyleTypeIngredient } from '../../../helpers/type-ingredient-style'
import { ShortIngredient } from '../constructor-ingredient/short-ingredient/ShortIngredient'
import { LongIngredient } from '../constructor-ingredient/long-ingredient/LongIngredient'

export class ConstructorCategory extends React.Component {
  renderIngredient = ({ item }) => {
    switch (this.props.constructorCategory.StyleTypeIngredient) {
      case StyleTypeIngredient.Short:
        return <ShortIngredient
          style={this.props.style}
          ingredient={item}
        />
      case StyleTypeIngredient.Long:
        return <LongIngredient
          style={this.props.style}
          ingredient={item}
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

  render() {
    return (
      <View
        style={[
          Style.container,
          this.props.style.theme.backdoor,
          this.props.style.theme.dividerColor
        ]}>
        <View style={[Style.header]}>
          <Text
            style={[
              this.props.style.fontSize.h6,
              this.props.style.theme.primaryTextColor,
            ]}>
            {this.props.constructorCategory.Name}
          </Text>
        </View>
        <View style={[Style.ingredients]}>
          <FlatList
            numColumns={this.getCountColumn()}
            data={this.props.ingredients}
            keyExtractor={item => item.Id.toString()}
            renderItem={this.renderIngredient}
          />
        </View>
      </View>
    )
  }
}