import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
} from 'react-native'
import Styles from './style'
import { ShoppingButton } from '../buttons/ShoppingButton/ShoppingButton';
import { timingAnimation } from '../../animation/timingAnimation'

export class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    componentDidMount() {
        if (this.props.animation &&
            this.props.animation.useAnimation)
            timingAnimation(this.state.showScaleAnimation, 1, this.props.animation.duration, true)
        else
            this.setState({ showScaleAnimation: 1 })
    }

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
                <Animated.View style={[
                    Styles.directionRow,
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
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
                                    borderColor={this.props.style.theme.dividerColor.borderColor}
                                    backgroundColor={this.props.style.theme.accentColor.backgroundColor} />
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </TouchableHighlight >
        )
    }
}