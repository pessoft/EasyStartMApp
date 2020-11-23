import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated,
    Platform
} from 'react-native'
import { ProductItem } from '../../components/product/ProductItem'
import { ProductItemWithOptions } from '../../components/product/ProductItemWithOptions'
import { ProductItemGrid } from '../../components/product/ProductItemGrid'
import { ProductItemGridWithOptions } from '../../components/product/ProductItemGridWithOptions'
import { setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCT_INFO, CASHBACK_PROFILE } from '../../navigation/pointsNavigate'
import { timingAnimation } from '../../animation/timingAnimation'
import { toggleProductInBasket, changeTotalCountProductInBasket, toggleProductWithOptionsInBasket } from '../../store/basket/actions'
import { markFromBasket } from '../../store/navigation/actions'
import VirtualMoneyButton from '../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import ViewContainerProductsChanger from '../../components/view-container-changer/ViewContainerProductsChanger'
import { ViewContainerType } from '../../helpers/view-container-type'
import { ProductAdditionalInfoType, ProductAdditionalInfoTypeShortName } from '../../helpers/product-additional-option'
import ProductWithOptions from '../../components/raw-bottom-sheets/product-with-options/ProductWithOptions'
import BasketIcoWithBadge from '../../components/badges/basket-badge/BasketIcoWithBadge'

class ProductsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const headerTitle = navigation.getParam('categoryName', 'Блюда')

        return {
            headerTitle,
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
            },
            headerRight: () => <BasketIcoWithBadge
            containerStyle={{ paddingHorizontal: 20 }}
            navigation={navigation}
            width={28}
            height={28}
            animation={true} />
        }
    }

    constructor(props) {
        super(props)

        this.props.navigation.setParams({
            categoryName: this.props.selectedCategory.Name,
        })

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            refreshItems: false,
            metadataProductWithOptions: {
                toggleInfoProductWithOptions: false,
                selectedProductId: -1
            }
        }
    }

    goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

    componentDidMount = () => {
        this.props.setSelectedProduct({})

        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({ refreshItems: !this.state.refreshItems })
        });

        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this.props.setSelectedProduct({})
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
                additionInfo: this.getProductAdditionalInfo(item),
                price: this.getProductPrice(item),
                currencyPrefix: this.props.currencyPrefix,
                startCount: countProduct,
                productType: item.ProductType,
                index
            },
        }
    }

    getProductPrice = product => {
        let price = product.Price
        if (product.ProductAdditionalInfoType != ProductAdditionalInfoType.Custom) {
            if (product.ProductAdditionalOptionIds.length != 0) {
                for (const optionId of product.ProductAdditionalOptionIds) {
                    const productOptions = this.props.additionalOptions[optionId]
                    const defaultOption = productOptions.Items.find(p => p.IsDefault)

                    price += defaultOption.Price
                }
            }
        }

        return price
    }

    getProductAdditionalInfo = product => {
        let additionInfo
        if (product.ProductAdditionalInfoType != ProductAdditionalInfoType.Custom) {
            let value = parseFloat(product.AdditionInfo)
            if (product.ProductAdditionalOptionIds.length != 0) {
                for (const optionId of product.ProductAdditionalOptionIds) {
                    const productOptions = this.props.additionalOptions[optionId]
                    const defaultOption = productOptions.Items.find(p => p.IsDefault)

                    value += defaultOption.AdditionalInfo
                }
            }

            additionInfo = `${value} ${ProductAdditionalInfoTypeShortName[product.ProductAdditionalInfoType]}`
        } else
            additionInfo = product.AdditionInfo

        return additionInfo
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

        if (this.props.basketProductsWithOptions && Object.keys(this.props.basketProductsWithOptions).length != 0) {
            countCalc(this.props.basketProductsWithOptions)
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

    toggleProductWithOptionsInBasket = basketProduct => {
        const basketProductModify = { ...this.props.basketProductsWithOptions }
        basketProductModify[basketProduct.uniqId] = {
            uniqId: basketProduct.uniqId,
            categoryId: this.props.selectedCategory.Id,
            count: basketProduct.count,
            productId: basketProduct.productId,
            additionalOptions: basketProduct.additionalOptions,
            additionalFillings: basketProduct.additionalFillings,
        }

        this.props.toggleProductWithOptionsInBasket(basketProductModify)
    }

    renderGridItem = ({ item, index }) => {
        let itemTransform = this.productTransform(item, index)

        if (item.ProductAdditionalOptionIds.length
            || item.ProductAdditionalFillingIds.length)
            return this.getProductGridWithOptionsView(itemTransform)
        else
            return this.getProductGridView(itemTransform)
    }

    getProductGridView = product => {
        return <ProductItemGrid
            style={this.props.style}
            animation={product.animation}
            id={product.id}
            product={product.product}
            onPress={this.onSelectedProduct}
            onToggleProduct={this.toggleProductInBasket}
        />
    }

    getProductGridWithOptionsView = product => {
        return <ProductItemGridWithOptions
            style={this.props.style}
            animation={product.animation}
            id={product.id}
            product={product.product}
            onPress={this.showSheetProductWithOptions}
            onToggleProduct={this.showSheetProductWithOptions}
        />
    }

    renderListItem = ({ item, index }) => {
        let itemTransform = this.productTransform(item, index)

        if (item.ProductAdditionalOptionIds.length
            || item.ProductAdditionalFillingIds.length)
            return this.getProductLisWithOptionsView(itemTransform)
        else
            return this.getProductListView(itemTransform)
    }

    getProductListView = product => {
        return <ProductItem
            style={this.props.style}
            animation={product.animation}
            id={product.id}
            product={product.product}
            onPress={this.onSelectedProduct}
            onToggleProduct={this.toggleProductInBasket}
        />
    }

    getProductLisWithOptionsView = product => {
        return <ProductItemWithOptions
            style={this.props.style}
            animation={product.animation}
            id={product.id}
            product={product.product}
            onPress={this.showSheetProductWithOptions}
            onToggleProduct={this.showSheetProductWithOptions}
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
                    alignSelf: 'center',
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
                    alignSelf: 'center',
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

    showSheetProductWithOptions = productId => {
        this.setState({
            metadataProductWithOptions: {
                toggleInfoProductWithOptions: true,
                selectedProductId: productId
            }
        })
    }

    closeSheetProductWithOptions = () => {
        this.setState({
            metadataProductWithOptions: {
                toggleInfoProductWithOptions: false,
                selectedProductId: -1
            }
        })
    }

    render() {
        return (
            <Animated.View
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: 1,
                    alignContent: 'space-between'
                }}
                style={[
                    {
                        opacity: this.state.showScaleAnimation,
                        transform: [{ scale: this.state.showScaleAnimation }]
                    }]}>

                {this.renderContent()}
                <ProductWithOptions
                    toggle={this.state.metadataProductWithOptions.toggleInfoProductWithOptions}
                    close={this.closeSheetProductWithOptions}
                    productId={this.state.metadataProductWithOptions.selectedProductId}
                    onToggleProduct={this.toggleProductWithOptionsInBasket}
                />
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverDomain: state.appSetting.serverDomain,
        currencyPrefix: state.appSetting.currencyPrefix,
        products: state.main.products,
        additionalOptions: state.main.additionalOptions,
        additionalFillings: state.main.additionalFillings,
        selectedCategory: state.catalog.selectedCategory,
        selectedProduct: state.catalog.selectedProduct,
        basketProducts: state.basket.basketProducts,
        basketConstructorProducts: state.basket.basketConstructorProducts,
        basketProductsWithOptions: state.basket.basketProductsWithOptions,
        totalCountProducts: state.basket.totalCountProducts,
        style: state.style,
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        selectedProductsViewType: state.appSetting.selectedProductsViewType,
    }
}

const mapActionToProps = {
    setSelectedProduct,
    toggleProductInBasket,
    toggleProductWithOptionsInBasket,
    markFromBasket,
    changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(ProductsScreen)
