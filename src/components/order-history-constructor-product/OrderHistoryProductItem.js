import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
} from 'react-native'
import Style from './style'
import { generateRandomString } from '../../helpers/utils'

export class OrderHistoryConstructorProductItem extends React.Component {
    getIngredients = () => {
        let ingredients = []

        for (const ingredient of this.props.product.Ingredients) {
            ingredients.push(`${ingredient.Name} x ${ingredient.Count}`)
        }

        return ingredients
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
                        {
                            this.getIngredients().map(p => <Text
                                key={generateRandomString(8)}
                                style={[
                                    this.props.style.fontSize.h10,
                                    this.props.style.theme.secondaryTextColor]}>
                                {p}
                            </Text>)
                        }
                    </View>
                    <View style={Style.priceContainer}>
                        <Text
                            style={[
                                this.props.style.theme.secondaryTextColor,
                                this.props.style.fontSize.h9]}>
                            {`${this.props.product.Count} x ${this.props.product.Price} ${this.props.currencyPrefix}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}