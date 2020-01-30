import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated,
    View,
    ScrollView,
} from 'react-native'
import Image from 'react-native-scalable-image'
import { CategoryItem } from '../../components/category/CategoryItem';
import { setSelectedCategory, setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCTS, STOCK_INFO, CONSTRUCTOR_PRODUCTS, CASHBACK_PROFILE } from '../../navigation/pointsNavigate';
import { timingAnimation } from '../../animation/timingAnimation'
import { Text } from 'react-native'
import VirtualMoneyButton from '../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { StockBannerCarousel } from '../../components/category/stock-banner-carousel/StockBannerCarousel';
import { setSelectedStock } from '../../store/stock/actions'
import { CategoryType } from '../../helpers/type-category'

class CategoriesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const isShowVirtualMoney = navigation.getParam('isShowVirtualMoney', false)
        const onPress = navigation.getParam('onPress', null)
        if (isShowVirtualMoney)
            return {
                headerTitle: 'Категории',
                headerTitleStyle: {
                    textAlign: "left",
                    flex: 1,
                },
                headerRight: () => <VirtualMoneyButton onPress={onPress}/>
            }

        return {
            headerTitle: 'Категории'
        }
    }

    constructor(props) {
        super(props)

        this.props.navigation.setParams({ 
            isShowVirtualMoney: this.props.promotionCashbackSetting.IsUseCashback,
            onPress: () => this.goToCashbackScreen()
        })

        this.props.setSelectedProduct({})
        this.props.setSelectedCategory({})

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            goToStock: false
        }
    }

    goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

    componentDidMount = () => {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    componentDidUpdate = () => {
        if (Object.keys(this.props.selectedCategory).length > 0
            && this.props.selectedCategory.Id > 0) {
            switch (this.props.selectedCategory.CategoryType) {
                case CategoryType.Constructor:
                    this.props.navigation.navigate(CONSTRUCTOR_PRODUCTS)
                    break
                default:
                    this.props.navigation.navigate(PRODUCTS)
                    break
            }
        } else if (this.props.selectedStock.Id > 0
            && this.state.goToStock) {
            this.setState({ goToStock: false },
                () => this.props.navigation.navigate(STOCK_INFO))
        }
    }

    onSelectedCategory = categoryId => {
        this.props.setSelectedCategory({})
        this.props.setSelectedCategory(this.getCategoryById(categoryId))
    }

    getCategoryById = id => {
        const results = this.props.categories.filter(p => p.Id == id)

        if (results.length > 0)
            return results[0]

        return {}
    }

    categoriesTransform = () => {
        const categories = []
        for (let category of this.props.categories) {
            categories[category.OrderNumber - 1] = {
                key: `${category.Id}`,
                caption: category.Name,
                imageSource: category.Image
            }
        }

        return categories
    }

    onSelectedStock = stock => {
        this.props.setSelectedCategory({})
        this.props.setSelectedStock({})
        this.props.setSelectedStock(stock)
        this.setState({ goToStock: true })
    }

    renderItem = ({ item }) => {
        return <CategoryItem
            style={this.props.style}
            id={item.key}
            caption={item.caption}
            imageSource={item.imageSource}
            onPress={this.onSelectedCategory}
        />
    }

    render() {
        return (
            <Animated.View
                style={[
                    {
                        flex: 1,
                        opacity: this.state.showScaleAnimation,
                        transform: [{ scale: this.state.showScaleAnimation }]
                    }]}>
                {
                    this.props.stocks.length > 0 &&
                    this.props.promotionSetting.IsShowStockBanner &&
                    <StockBannerCarousel
                        style={this.props.style}
                        stocks={this.props.stocks}
                        onPress={this.onSelectedStock}
                    />
                }

                <ScrollView style={{ flex: 1 }}>
                    <FlatList
                        windowSize={4}
                        removeClippedSubviews={true}
                        initialNumToRender={4}
                        data={this.categoriesTransform()}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        promotionSetting: state.main.promotionSetting,
        serverDomain: state.appSetting.serverDomain,
        categories: state.main.categories,
        selectedCategory: state.catalog.selectedCategory,
        selectedStock: state.stock.selectedStock,
        style: state.style,
        stocks: state.main.stocks,
    }
}

const mapActionToProps = {
    setSelectedCategory,
    setSelectedProduct,
    setSelectedStock
}

export default connect(mapStateToProps, mapActionToProps)(CategoriesScreen)