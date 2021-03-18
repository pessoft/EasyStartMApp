import React from 'react'
import Carousel from '@webileapps/react-native-banner-carousel'
import { TouchableWithoutFeedback, Dimensions, View, Image, Text } from 'react-native'
import { ProductItem } from './ProductItem'
import Style from './recommended-products-style'
import { showMessage } from 'react-native-flash-message'

const carouselWidth = Dimensions.get('window').width - 24

export class RecommendedProducts extends React.Component {

    successAddedProductMsg = 'Товар добавлен в корзину'

    showSuccessMessage = msg => {
        showMessage({
            message: msg,
            type: 'success',
        });
    }

    toggleProductHandler = basketProduct => {
        let payload = { ...basketProduct }
        delete payload.withOptions

        if (basketProduct.withOptions)
            this.props.onToggleProductWithOptions(payload)
        else
            this.props.onToggleProduct(payload)

        this.showSuccessMessage(this.successAddedProductMsg)
    }

    getData() {
        const products = this.props.products
        const items = []

        if (products && products.length > 0) {
            for (product of products) {
                items.push(
                    <ProductItem
                        key={product.Id.toString()}
                        style={this.props.style}
                        product={product}
                        additionalOptions={this.props.additionalOptions}
                        currencyPrefix={this.props.currencyPrefix}
                        onToggleProduct={this.toggleProductHandler}
                    />

                )
            }
        }

        return items
    }

    render() {
        return <View style={[
            Style.container,
            this.props.style.theme.shadowColor
            ]}>
            <View style={[
                this.props.style.theme.backdoor,
                Style.headerContainer,
                this.props.style.theme.dividerColor]}>
                <Text
                    style={[
                        this.props.style.theme.primaryTextColor,
                        this.props.style.fontSize.h8
                    ]}>
                    Добавить к заказу?
            </Text>
            </View>

            <Carousel
                showsPageIndicator={false}
                autoplay
                autoplayTimeout={2500}
                loop
                index={0}
                pageSize={carouselWidth}
            >
                {this.getData()}
            </Carousel>
        </View>
    }
}