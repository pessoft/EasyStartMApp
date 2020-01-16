import React from 'react'
import { Text, View, Button } from 'react-native'
import Style from './style'
import { CounterButton } from '../../buttons/CounterButton/CounterButton';

export class ConstructorToggleBasket extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            price: this.getPrice()
        }
    }

    componentDidUpdate(prevPros) {
        if (prevPros.constructorIngredients != this.props.constructorIngredients) {
            this.setState({ price: this.getPrice() })
        }
    }

    getPrice = () => {
        let price = 0;

        for (const categoryConstructorId in this.props.constructorIngredients) {
            let categoryConstructor = this.props.constructorIngredients[categoryConstructorId]
            for (const ingredient of categoryConstructor.ingredients) {
                price += ingredient.Price * categoryConstructor.ingredientsCount[ingredient.Id]
            }
        }

        return price
    }

    getAllPrice = () => `${this.props.count * this.state.price} ${this.props.currencyPrefix}`

    getCountWithPrice = () => `${this.props.count} x ${this.state.price} ${this.props.currencyPrefix}`

    render() {
        return (
            <View style={Style.container}>
                <View style={Style.blockHeader}>
                    {
                        this.state.price != 0 &&
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
                        this.state.price == 0 &&
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
                        this.state.price != 0 &&
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
                <View style={Style.blockFooter}>
                    <Button
                        onPress={this.props.onToggleConstructorProducts}
                        title='В корзину'
                        disabled={this.state.price == 0}
                        color={Platform.OS == 'ios' ?
                            this.props.style.theme.accentOther.backgroundColor :
                            this.props.style.theme.defaultPrimaryColor.backgroundColor} />
                </View>
            </View>
        )
    }
}