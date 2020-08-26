import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
} from 'react-native'
import Style from './style'
import { generateRandomString } from '../../helpers/utils'


export class OrderHistoryProductWithOptionsItem extends React.Component {
    getIngredients = () => {
        let ingredients = []

        for (const ingredient of this.props.product.Ingredients) {
            ingredients.push(`${ingredient.Name} x ${ingredient.Count}`)
        }

        return ingredients
    }

    getPrice = () => {
        let price = this.props.product.Price

        if(Object.keys(this.props.product.AdditionalOptions).length > 0) {
            for(const id in this.props.product.AdditionalOptions) {
                const additionalOption = this.props.product.AdditionalOptions[id]
                const additionalOptionItem = additionalOption.Items[0]

                price += additionalOptionItem.Price
            }
        }

        if(Object.keys(this.props.product.AdditionalFillings).length > 0) {
            for(const id in this.props.product.AdditionalFillings) {
                const additionalFilling = this.props.product.AdditionalFillings[id]

                price += additionalFilling.Price
            }
        }

        return price
    }

    renderAdditionalOptions = () => {
        const itemsForRender = []

        if (Object.keys(this.props.product.AdditionalOptions).length) {
            for (const id in this.props.product.AdditionalOptions) {
                const additionalOption = this.props.product.AdditionalOptions[id]

                for (const additionalOptionItem of additionalOption.Items) {
                    itemsForRender.push(
                        <Text
                            key={generateRandomString(8)}
                            style={[
                                this.props.style.fontSize.h10,
                                this.props.style.theme.secondaryTextColor]}>
                            {additionalOptionItem.Name}
                        </Text>
                    )
                }
            }
        }

        return itemsForRender
    }

    renderAdditionalFillings = () => {
        const itemsForRender = []

        if (Object.keys(this.props.product.AdditionalFillings).length) {
            for (const id in this.props.product.AdditionalFillings) {
                const additionalFilling = this.props.product.AdditionalFillings[id]

                itemsForRender.push(
                    <Text
                        key={generateRandomString(8)}
                        style={[
                            this.props.style.fontSize.h10,
                            this.props.style.theme.secondaryTextColor]}>
                        {additionalFilling.Name}
                    </Text>
                )
            }
        }

        return itemsForRender
    }

    render() {
        return (
            <View style={[
                Style.directionRow,
                this.props.style.theme.backdoor,
                this.props.style.theme.shadowColor,
            ]}>
                <View style={Style.imageContainer}>
                    <Image
                        source={this.props.product.Image}
                        style={Style.productImage}
                    />
                </View>
                <View style={[
                    Style.productInfoContainer,
                    this.props.style.theme.dividerColor]}>
                    <View style={Style.captionContainer}>
                        <Text style={[
                            Style.textWrap,
                            this.props.style.fontSize.h8,
                            this.props.style.theme.primaryTextColor]}>
                            {this.props.product.Name.trimStart()}
                        </Text>
                        {this.renderAdditionalOptions()}
                        {this.renderAdditionalFillings()}
                    </View>
                    <View style={Style.priceContainer}>
                        <Text
                            style={[
                                this.props.style.theme.secondaryTextColor,
                                this.props.style.fontSize.h9]}>
                            {`${this.props.product.Count} x ${this.getPrice()} ${this.props.currencyPrefix}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}