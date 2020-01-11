import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated
} from 'react-native'
import { ProductItem } from '../../../components/product/ProductItem';
import { setSelectedProduct } from '../../../store/catalog/actions'
import { PRODUCT_INFO } from '../../../navigation/pointsNavigate'
import { timingAnimation } from '../../../animation/timingAnimation'
import { toggleProductInBasket, changeTotalCountProductInBasket } from '../../../store/checkout/actions'
import { markFromBasket } from '../../../store/navigation/actions'
import VirtualMoneyButton from '../../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { ConstructorCategory } from '../../../components/constructor-products/constructor-category/ConstructorCategory';

class ConstructorProductsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const isShowVirtualMoney = navigation.getParam('isShowVirtualMoney', false)
        const headerTitle = navigation.getParam('categoryName', 'Блюда')

        if (isShowVirtualMoney)
            return {
                headerTitle,
                headerTitleStyle: {
                    textAlign: "left",
                    flex: 1,
                },
                headerRight: () => <VirtualMoneyButton />
            }

        return {
            headerTitle
        }
    }

    constructor(props) {
        super(props)
        this.props.navigation.setParams({
            categoryName: this.props.selectedCategory.Name,
            isShowVirtualMoney: this.props.promotionCashbackSetting.IsUseCashback
        })

        this.state = {
            showScaleAnimation: new Animated.Value(0),
        }
    }

    componentDidMount = () => {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    componentDidUpdate = () => {
    }

    getData = () => {
        return this.props.constructorCategories[this.props.selectedCategory.Id]
    }

    renderConstructorCategory = ({ item }) => {
        return <ConstructorCategory
            style={this.props.style}
            ingredients={this.props.ingredients[item.Id]}
            constructorCategory={item}
            currencyPrefix={this.props.currencyPrefix}
        />
    }

    render() {
        return (
            <Animated.ScrollView
                style={[
                    {
                        flex: 1,
                        opacity: this.state.showScaleAnimation,
                        transform: [{ scale: this.state.showScaleAnimation }]
                    }]}>
                <FlatList
                    data={this.getData()}
                    keyExtractor={item => item.Id.toString()}
                    renderItem={this.renderConstructorCategory}
                />
            </Animated.ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverDomain: state.appSetting.serverDomain,
        currencyPrefix: state.appSetting.currencyPrefix,
        selectedCategory: state.catalog.selectedCategory,
        basketProducts: state.checkout.basketProducts,
        totalCountProducts: state.checkout.totalCountProducts,
        style: state.style,
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        constructorCategories: state.main.constructorCategories,
        ingredients: state.main.ingredients,
    }
}

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(ConstructorProductsScreen)