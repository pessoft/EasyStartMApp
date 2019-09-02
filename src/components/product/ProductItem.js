import React from 'react'
import { TouchableHighlight, Image, Text, View } from 'react-native'
import Styles from './style'
import { ShoppingButton } from '../buttons/ShoppingButton/ShoppingButton';

export class ProductItem extends React.PureComponent {
    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                style={Styles.bodyItem}
                onPress={this.onPress}>
                <View style={Styles.directionRow}>
                    <Image
                        source={this.props.product.imageSource}
                        style={Styles.productImage}
                    />
                    <View style={[
                        Styles.productHeader,
                        this.props.style.theme.dividerColor]}>
                        <Text style={[
                            Styles.textWrap,
                            this.props.style.fontSize.h7,
                            this.props.style.theme.primaryTextColor]}>
                            {this.props.product.caption}
                        </Text>

                        <Text style={[Styles.mt_5, this.props.style.theme.secondaryTextColor]}>
                            {this.props.product.additionInfo}
                        </Text>

                        <View style={Styles.blockShopAction}>
                            <Text style={[
                                Styles.textWrap,
                                this.props.style.fontSize.h7,
                                this.props.style.theme.primaryTextColor]}>
                                {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                            </Text>
                            <View style={Styles.blockShopButtons}>
                                <ShoppingButton
                                    size={20}
                                    underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                                    color={this.props.style.theme.textPrimaryColor.color}
                                    backgroundColor={this.props.style.theme.accentColor.backgroundColor} />
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}