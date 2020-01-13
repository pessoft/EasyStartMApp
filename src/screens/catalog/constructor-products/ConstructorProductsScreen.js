import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated,
    View
} from 'react-native'
import { ProductItem } from '../../../components/product/ProductItem';
import { setSelectedProduct } from '../../../store/catalog/actions'
import { PRODUCT_INFO } from '../../../navigation/pointsNavigate'
import { timingAnimation } from '../../../animation/timingAnimation'
import { toggleProductInBasket, changeTotalCountProductInBasket } from '../../../store/checkout/actions'
import { markFromBasket } from '../../../store/navigation/actions'
import VirtualMoneyButton from '../../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { ConstructorCategory } from '../../../components/constructor-products/constructor-category/ConstructorCategory';
import Style from './style'
import { ConstructorToggleBasket } from '../../../components/constructor-products/constructor-toggle-basket/ConstructorToggleBasket';

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
            count: 1,
            constructorIngredients: this.initConstructorIngredients()
        }
    }

    initConstructorIngredients = () => {
        const constructorCategories = this.props.constructorCategories[this.props.selectedCategory.Id]
        let constructorIngredients = {}

        for (const constructorCategory of constructorCategories) {
            const ingredients = this.props.ingredients[constructorCategory.Id]
            constructorIngredients[constructorCategory.Id] = {
                constructorCategory: constructorCategory,
                ingredients: ingredients,
                ingredientsCount: this.initIngredientsCount(ingredients)
            }
        }

        return constructorIngredients
    }

    initIngredientsCount = ingredients => {
        let ingredientsCount = {}

        for (let ingredient of ingredients) {
            ingredientsCount[ingredient.Id] = 0
        }

        return ingredientsCount
    }

    componentDidMount = () => {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    componentDidUpdate = () => {
    }

    getData = () => {
        return this.props.constructorCategories[this.props.selectedCategory.Id]
    }

    changeIngredientsCount = (categoryConstructorId, ingredintsCount) => {
        let constructorIngredients = { ...this.state.constructorIngredients }

        constructorIngredients[categoryConstructorId].ingredientsCount = ingredintsCount

        this.setState({ constructorIngredients })
    }

    renderConstructorCategory = ({ item }) => {
        return <ConstructorCategory
            style={this.props.style}
            onChangeIngredientsCount={this.changeIngredientsCount}
            ingredients={this.props.ingredients[item.Id]}
            ingredientsCount={this.state.constructorIngredients[item.Id].ingredientsCount}
            constructorCategory={item}
            currencyPrefix={this.props.currencyPrefix}
        />
    }

    onChangeCount = count => {
        if (count < 1)
            this.setState({ count: 1 })
        else
            this.setState({ count })
    }

    render() {
        return (
            <Animated.ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}
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
                    extraData={this.state.constructorIngredients}
                />
                <View
                    style={[
                        Style.constructorFooter,
                        this.props.style.theme.dividerColor]}>
                    <ConstructorToggleBasket
                        style={this.props.style}
                        count={this.state.count}
                        constructorIngredients={this.state.constructorIngredients}
                        onChangeCount={this.onChangeCount}
                        currencyPrefix={this.props.currencyPrefix}
                    />
                </View>
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