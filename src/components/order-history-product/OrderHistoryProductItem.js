import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
} from 'react-native'
import Style from './style'

export class OrderHistoryProductItem extends React.Component {

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.backdoor.backgroundColor}
            >
                <View style={[Style.directionRow]}>
                    <View style={Style.imageContainer}>
                        <Image
                            source={this.props.product.imageSource}
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
                                {this.props.product.caption}
                            </Text>
                            <Text style={[
                                this.props.style.fontSize.h10,
                                this.props.style.theme.secondaryTextColor]}>
                                {this.props.product.additionInfo}
                            </Text>
                        </View>
                        <View style={Style.priceContainer}>
                            <Text
                                style={[
                                    this.props.style.theme.secondaryTextColor,
                                    this.props.style.fontSize.h9]}>
                                {`${this.props.product.count} x ${this.props.product.price} ${this.props.product.currencyPrefix}`}
                               </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}