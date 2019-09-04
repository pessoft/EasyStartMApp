import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, FlatList } from 'react-native'
import { ProductItem } from '../../components/product/ProductItem';
import { setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCT_INFO } from '../../navigation/pointsNavigate'

class ProductsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('categoryName', 'Блюда'),
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            }
        }
    }

    constructor(props) {
        super(props)
        this.props.navigation.setParams({ categoryName: this.props.selectedCategory.Name })
        this.props.setSelectedProduct({})
    }

    componentDidUpdate = () => {
        if (Object.keys(this.props.selectedProduct).length > 0
            && this.props.selectedProduct.Id > 0) {
            this.props.navigation.navigate(PRODUCT_INFO)
        }
    }

    getProductById = (products, targetId) => {
        return products.filter(p => p.Id == targetId)[0]
    }

    onSelectedProduct = productId => {
        const categoryId = this.props.selectedCategory.Id
        const products = this.props.products[categoryId]
        const product = this.getProductById(products, productId)

        this.props.setSelectedProduct({})
        this.props.setSelectedProduct(product)
    }

    getImageSource = imagePath => {
        return { uri: `${this.props.serverDomain}${imagePath}` }
    }

    productsTransform = () => {
        const productsForRender = []
        const products = this.props.products[this.props.selectedCategory.Id]

        let delay = 60
        const animationMaxCount = 5
        for (let item of products) {
            productsForRender[item.OrderNumber - 1] = {
                key: `${item.Id}`,
                animation: {
                    delay: delay * (item.OrderNumber - 1),
                    useAnimation: item.OrderNumber < animationMaxCount
                },
                product: {
                    caption: item.Name,
                    imageSource: this.getImageSource(item.Image),
                    additionInfo: item.AdditionInfo,
                    price: item.Price,
                    currencyPrefix: this.props.currencyPrefix
                }
            }
        }
        return productsForRender
    }

    renderItem = ({ item }) => {
        return <ProductItem
            style={this.props.style}
            animation={item.animation}
            id={item.key}
            product={item.product}
            onPress={this.onSelectedProduct}
        />
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    windowSize={4}
                    removeClippedSubviews={true}
                    initialNumToRender={2}
                    maxToRenderPerBatch={1}
                    data={this.productsTransform()}
                    renderItem={this.renderItem}
                />
            </ScrollView>
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
        style: state.style
    }
}

export default connect(mapStateToProps, { setSelectedProduct })(ProductsScreen)