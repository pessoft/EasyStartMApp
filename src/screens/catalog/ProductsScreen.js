import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, FlatList } from 'react-native'
import { ProductItem } from '../../components/product/ProductItem';

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
    }

    onSelectedProduct = productId => {

    }

    getImageSource = imagePath => {
        return { uri: `${this.props.serverURL}${imagePath}` }
    }

    productsTransform = () => {
        const productsForRender = []
        const products = this.props.products[this.props.selectedCategory.Id]

        for (let item of products) {
            productsForRender[item.OrderNumber - 1] = {
                key: `${item.Id}`,
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
        serverURL: state.appSetting.serverURL,
        currencyPrefix: state.appSetting.currencyPrefix,
        products: state.main.products,
        selectedCategory: state.catalog.selectedCategory,
        selectedProduct: state.catalog.selectedProduct
    }
}

export default connect(mapStateToProps)(ProductsScreen)