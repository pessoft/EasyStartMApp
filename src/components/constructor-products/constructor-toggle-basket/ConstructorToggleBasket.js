import React from 'react'
import { Text, View, Button } from 'react-native'
import Style from './style'
import { CounterButton } from '../../buttons/CounterButton/CounterButton'

export class ConstructorToggleBasket extends React.Component {

    constructor(props) {
        super(props)

        const constructorData = this.getConstructorData()
        this.state = {
            price: constructorData.price,
            isAllowToBasket: constructorData.isAllowToBasket
        }
    }

    componentDidUpdate(prevPros) {
        if (prevPros.constructorIngredients != this.props.constructorIngredients) {
            const constructorData = this.getConstructorData()
            this.setState({ price: constructorData.price, isAllowToBasket: constructorData.isAllowToBasket })
        }
    }

    getConstructorData = () => {
        let price = 0
        let isAllowToBasket = true

        for (const categoryConstructorId in this.props.constructorIngredients) {
            let categoryConstructor = this.props.constructorIngredients[categoryConstructorId]
            let countAdded = 0

            for (const ingredient of categoryConstructor.ingredients) {
                const count = categoryConstructor.ingredientsCount[ingredient.Id]

                price += ingredient.Price * count
                countAdded += count
            }

            if (categoryConstructor.minCountIngredient > countAdded) {
                isAllowToBasket = false
            }
        }

        return { price, isAllowToBasket }
    }

    getAllPrice = () => `${this.props.count * this.state.price} ${this.props.currencyPrefix}`

    getCountWithPrice = () => `${this.props.count} x ${this.state.price} ${this.props.currencyPrefix}`

    getFooter = () => {
        if (!this.state.isAllowToBasket && Platform.OS == 'ios')
            return null
        else
            return (
                <View style={Style.blockFooter}>
                    <Button
                        onPress={this.props.onToggleConstructorProducts}
                        title='В корзину'
                        disabled={!this.state.isAllowToBasket}
                        color={Platform.OS == 'ios' ?
                            this.props.style.theme.accentOther.backgroundColor :
                            this.props.style.theme.defaultPrimaryColor.backgroundColor} />
                </View>
            )
    }

    render() {
        return (
            <View style={[Style.container, this.props.style.theme.backdoor]}>
                <View style={Style.blockHeader}>
                    {
                        this.state.isAllowToBasket &&
                        <View style={Style.headerPrice}>
                            <Text
                                style={[
                                    this.props.style.theme.primaryTextColor,
                                    this.props.style.fontSize.h6
                                ]}>
                                {this.getAllPrice()}
                            </Text>
                            <Text
                                style={[
                                    this.props.style.theme.secondaryTextColor,
                                    this.props.style.fontSize.h9
                                ]}>
                                {this.getCountWithPrice()}
                            </Text>
                        </View>
                    }
                    {
                        !this.state.isAllowToBasket &&
                        <View style={Style.headerEmpty}>
                            <Text
                                style={[
                                    this.props.style.theme.primaryTextColor,
                                    this.props.style.fontSize.h8,
                                    Style.textCenter
                                ]}>
                                Добавте ингредиенты
                            </Text>
                        </View>
                    }
                    {
                        this.state.isAllowToBasket &&
                        <View style={Style.headerCounter}>
                            <CounterButton
                                onPress={this.props.onChangeCount}
                                startCount={this.props.count}
                                size={20}
                                underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                                color={this.props.style.theme.textPrimaryColor.color}
                                tintColor={this.props.style.theme.primaryTextColor.color}
                                borderColor={this.props.style.theme.dividerColor.borderColor}
                                backgroundColor={this.props.style.theme.accentColor.backgroundColor} />
                        </View>
                    }
                </View>
                {
                    this.getFooter()
                }

            </View>
        )
    }
}