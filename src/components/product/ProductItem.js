import React from 'react'
import { TouchableHighlight, Image, Text, View } from 'react-native'
import Styles from './style'
import { BasketButton } from '../buttons-square/BasketButton';

export class ProductItem extends React.PureComponent {
    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor='#f9f9f9'
                style={[Styles.bodyItem, Styles.ph_10]}
                onPress={this.onPress}>
                <View style={[Styles.directionRow]}>
                    <Image
                        source={this.props.product.imageSource}
                        style={[Styles.imageNormalSize, Styles.rounded]}
                    />
                    <View style={[Styles.productHeader, Styles.bottmBorder]}>
                        <Text style={[Styles.textWrap, Styles.captionProduct]}>
                            {this.props.product.caption}
                        </Text>
                        <Text style={Styles.mt_5}>
                            {this.props.product.additionInfo}
                        </Text>
                        <View style={Styles.blockShopAction}>
                            <Text style={[Styles.textWrap, Styles.captionProduct]}>
                                {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                            </Text>
                            <View style={Styles.blockShopButtons}>
                                <BasketButton size={18} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}