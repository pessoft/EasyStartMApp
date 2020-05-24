import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Dimensions
} from 'react-native'
import Style from './style'


const min320 = Dimensions.get('window').width <= 320

export class OrderHistoryProductItem extends React.Component {

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.backdoor.backgroundColor}
            >
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
                            <Text
                                numberOfLines={2}
                                ellipsizeMode={"tail"}
                                style={[
                                    Style.textWrap,
                                    min320 ?
                                    this.props.style.fontSize.h9 :
                                    this.props.style.fontSize.h8,
                                    this.props.style.theme.primaryTextColor]}>
                                {this.props.product.Name.trimStart()}
                            </Text>
                            <Text style={[
                                this.props.style.fontSize.h10,
                                this.props.style.theme.secondaryTextColor]}>
                                {this.props.product.AdditionInfo}
                            </Text>
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
            </TouchableHighlight>
        )
    }
}