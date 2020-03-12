import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated,
    Platform
} from 'react-native'
import { ProductItem } from '../../components/product/ProductItem'
import { ProductItemGrid } from '../../components/product/ProductItemGrid'
import { setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCT_INFO, CASHBACK_PROFILE } from '../../navigation/pointsNavigate'
import { timingAnimation } from '../../animation/timingAnimation'
import { toggleProductInBasket, changeTotalCountProductInBasket } from '../../store/checkout/actions'
import { markFromBasket } from '../../store/navigation/actions'
import VirtualMoneyButton from '../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import ViewContainerProductsChanger from '../../components/view-container-changer/ViewContainerProductsChanger'
import { ViewContainerType } from '../../helpers/view-container-type'

class ProductsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const headerTitle = navigation.getParam('categoryName', 'Блюда')

        return {
            headerTitle,
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
            },
            headerRight: () => <ViewContainerProductsChanger />
        }
    }

    constructor(props) {
        super(props)

        this.props.navigation.setParams({
            categoryName: this.props.selectedCategory.Name,
        })

        this.props.setSelectedProduct({})

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            refreshItems: false
        }
    }

    goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

    componentDidMount = () => {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.setSelectedProduct({})
            this.setState({ refreshItems: !this.state.refreshItems })
        });
    }

    componentDidUpdate = (prevProps) => {
        if (Object.keys(this.props.selectedProduct).length > 0
            && this.props.selectedProduct.Id > 0
            && this.props.navigation.isFocused()) {
            this.props.navigation.navigate(PRODUCT_INFO)
        }

        if (this.props.selectedCategory != prevProps.selectedCategory) {
            this.props.navigation.setParams({ categoryName: this.props.selectedCategory.Name })
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

    productTransform = (item, index) => {
        let countProduct = 0
        if (this.props.basketProducts[item.Id]) {
            countProduct = this.props.basketProducts[item.Id].count
        }

        return {
            id: item.Id,
            product: {
                caption: item.Name,
                imageSource: item.Image,
                additionInfo: item.AdditionInfo,
                price: item.Price,
                currencyPrefix: this.props.currencyPrefix,
                startCount: countProduct,
                productType: item.ProductType,
                index
            },
        }
    }

    changeTotalCountProductInBasket = () => {
        let count = 0

        const countCalc = items => {
            for (const id in items) {
                count += items[id].count;
            }
        }

        if (this.props.basketProducts && Object.keys(this.props.basketProducts).length != 0) {
            countCalc(this.props.basketProducts)
        }

        if (this.props.basketConstructorProducts && Object.keys(this.props.basketConstructorProducts).length != 0) {
            countCalc(this.props.basketConstructorProducts)
        }

        this.props.changeTotalCountProductInBasket(count)
    }

    toggleProductInBasket = basketProduct => {
        const basketProductModify = { ...this.props.basketProducts }
        basketProductModify[basketProduct.id] = {
            categoryId: this.props.selectedCategory.Id,
            count: basketProduct.count,
            index: basketProduct.index
        }

        this.props.toggleProductInBasket(basketProductModify)
    }

    renderGridItem = ({ item, index }) => {
        let itemTransform = this.productTransform(item, index)
        return <ProductItemGrid
            style={this.props.style}
            animation={itemTransform.animation}
            id={itemTransform.id}
            product={itemTransform.product}
            onPress={this.onSelectedProduct}
            onToggleProduct={this.toggleProductInBasket}
        />
    }

    renderListItem = ({ item, index }) => {
        let itemTransform = this.productTransform(item, index)
        return <ProductItem
            style={this.props.style}
            animation={itemTransform.animation}
            id={itemTransform.id}
            product={itemTransform.product}
            onPress={this.onSelectedProduct}
            onToggleProduct={this.toggleProductInBasket}
        />
    }

    keyExtractor = item => {
        if (this.props.basketProducts[item.Id]) {
            return `${item.Id}-${this.props.basketProducts[item.Id].count}`
        }

        return item.Id.toString()
    }

    getFlatListPerformanceProperty = () => {
        if (Platform.OS == 'ios')
            return {}
        else
            return {
                windowSize: 4,
                removeClippedSubviews: true,
                initialNumToRender: 4,
                maxToRenderPerBatch: 1,
            }
    }

    renderListView = () => {
        return (
            <FlatList
                contentContainerStyle={{
                    paddingVertical: 6,
                }}
                key={ViewContainerType.list.toString()}
                {...this.getFlatListPerformanceProperty()}
                renderItem={this.renderListItem}
                keyExtractor={this.keyExtractor}
                extraData={this.props.basketProducts}
                data={this.props.products[this.props.selectedCategory.Id]}
            />
        )
    }

    renderGridView = () => {
        return (
            <FlatList
                contentContainerStyle={{

                    paddingVertical: 6,
                }}
                key={ViewContainerType.grid.toString()}
                {...this.getFlatListPerformanceProperty()}
                renderItem={this.renderGridItem}
                keyExtractor={this.keyExtractor}
                extraData={this.props.basketProducts}
                numColumns={2}
                data={this.props.products[this.props.selectedCategory.Id]}
            />
        )
    }

    renderContent() {
        switch (this.props.selectedProductsViewType) {
            case ViewContainerType.list:
                return this.renderListView()
            case ViewContainerType.grid:
                return this.renderGridView()
        }
    }

    render() {
        return (
            <Animated.ScrollView
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: 12,
                    alignContent: 'space-between'
                }}
                style={[
                    {
                        opacity: this.state.showScaleAnimation,
                        transform: [{ scale: this.state.showScaleAnimation }]
                    }]}>

                {this.renderContent()}
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
        basketConstructorProducts: state.checkout.basketConstructorProducts,
        totalCountProducts: state.checkout.totalCountProducts,
        style: state.style,
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        selectedProductsViewType: state.appSetting.selectedProductsViewType,
    }
}

const mapActionToProps = {
    setSelectedProduct,
    toggleProductInBasket,
    markFromBasket,
    changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(ProductsScreen)