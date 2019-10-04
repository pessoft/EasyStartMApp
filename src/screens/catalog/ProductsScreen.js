import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated
} from 'react-native'
import { ProductItem } from '../../components/product/ProductItem';
import { setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCT_INFO } from '../../navigation/pointsNavigate'
import { timingAnimation } from '../../animation/timingAnimation'
import { toggleProductInBasket, changeTotalCountProductInBasket } from '../../store/checkout/actions'
import { markFromBasket } from '../../store/navigation/actions'

class ProductsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('categoryName', 'Блюда'),
        }
    }

    constructor(props) {
        super(props)
        this.props.navigation.setParams({ categoryName: this.props.selectedCategory.Name })
        this.props.setSelectedProduct({})

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            refreshItems: false
        }
    }

    componentDidMount = () => {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.setSelectedProduct({})
            this.setState({ refreshItems: !this.state.refreshItems })
        });
    }

    componentDidUpdate = () => {
        if (Object.keys(this.props.selectedProduct).length > 0
            && this.props.selectedProduct.Id > 0
            && this.props.navigation.isFocused()) {
            this.props.navigation.navigate(PRODUCT_INFO)
        }

        this.changeTotalCountProductInBasket()
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getProductById = (products, targetId) => {
        return products.filter(p => p.Id == targetId)[0]
    }

    onSelectedProduct = productId => {
        const categoryId = this.props.selectedCategory.Id
        const products = this.props.products[categoryId]
        const product = this.getProductById(products, productId)

        this.props.markFromBasket(false)
        this.props.setSelectedProduct({})
        this.props.setSelectedProduct(product)
    }

    getImageSource = imagePath => {
        return { uri: `${this.props.serverDomain}${imagePath}` }
    }

    productsTransform = () => {
        const productsForRender = []
        const products = this.props.products[this.props.selectedCategory.Id]

        for (let item of products) {
            let countProduct = 0
            if (this.props.basketProducts[item.Id]) {
                countProduct = this.props.basketProducts[item.Id].count
            }

            productsForRender[item.OrderNumber - 1] = {
                key: `${item.Id}-${countProduct}`,
                id: item.Id,
                product: {
                    caption: item.Name,
                    imageSource: this.getImageSource(item.Image),
                    additionInfo: item.AdditionInfo,
                    price: item.Price,
                    currencyPrefix: this.props.currencyPrefix,
                    startCount: countProduct
                }
            }
        }

        return productsForRender
    }

    changeTotalCountProductInBasket = () => {
        let count = 0

        if (this.props.basketProducts && Object.keys(this.props.basketProducts).length != 0) {
            for (let productId in this.props.basketProducts) {
                const itemBasket = this.props.basketProducts[productId]
                const productCount = itemBasket.count;

                count += productCount;
            }
        }

        this.props.changeTotalCountProductInBasket(count)
    }

    toggleProductInBasket = basketProduct => {
        const basketProductModify = {}
        basketProductModify[basketProduct.id] = {
            categoryId: this.props.selectedCategory.Id,
            count: basketProduct.count
        }

        this.props.toggleProductInBasket(basketProductModify)
    }

    renderItem = ({ item }) => {
        return <ProductItem
            style={this.props.style}
            animation={item.animation}
            id={item.id}
            product={item.product}
            onPress={this.onSelectedProduct}
            onToggleProduct={this.toggleProductInBasket}
        />
    }

    render() {
        return (
            <Animated.ScrollView
                style={[
                    { marginTop: 5 },
                    { opacity: this.state.showScaleAnimation },
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                <FlatList
                    windowSize={4}
                    removeClippedSubviews={true}
                    initialNumToRender={4}
                    maxToRenderPerBatch={1}
                    renderItem={this.renderItem}
                    data={this.productsTransform()}
                />
            </Animated.ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverDomain: state.appSetting.serverDomain,
        currencyPrefix: state.appSetting.currencyPrefix,
        products: state.main.products,
        selectedCategory: state.catalog.selectedCategory,
        selectedProduct: state.catalog.selectedProduct,
        basketProducts: state.checkout.basketProducts,
        totalCountProducts: state.checkout.totalCountProducts,
        style: state.style
    }
}

const mapActionToProps = {
    setSelectedProduct,
    toggleProductInBasket,
    markFromBasket,
    changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(ProductsScreen)