import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated,
    View
} from 'react-native'
import { timingAnimation } from '../../../animation/timingAnimation'
import VirtualMoneyButton from '../../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { ConstructorCategory } from '../../../components/constructor-products/constructor-category/ConstructorCategory'
import Style from './style'
import { ConstructorToggleBasket } from '../../../components/constructor-products/constructor-toggle-basket/ConstructorToggleBasket'
import {
    toggleConstructorProductInBasket,
    changeTotalCountProductInBasket
} from '../../../store/basket/actions'
import { generateRandomString } from '../../../helpers/utils'
import { priceValid, cloneObject } from '../../../helpers/utils'
import LottieView from 'lottie-react-native'
import BasketIcoWithBadge from '../../../components/badges/basket-badge/BasketIcoWithBadge'

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
            headerTitle,
            headerRight: () => <BasketIcoWithBadge
                containerStyle={{ paddingHorizontal: 25 }}
                navigation={navigation}
                width={28}
                height={28}
                animation={true} />,
            headerLeft: () => <BarsButton
                timeout={0}
                containerStyle={{ paddingHorizontal: 20 }}
                disabled={false}
                onPress={() => navigation.openDrawer()}
                size={25}
                nonBorder={true}
                color={style ? style.theme.textPrimaryColor.color : '#fff'} />
        }
    }

    constructor(props) {
        super(props)
        this.props.navigation.setParams({
            categoryName: this.props.selectedCategory.Name,
            style: this.props.style,
        })

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            count: 1,
            constructorIngredients: this.initConstructorIngredients(),
            showSuccessAnimation: false
        }
    }

    showSuccessAnimation = () => this.setState({ showSuccessAnimation: true })
    hideSuccessAnimation = () => this.setState({ showSuccessAnimation: false })

    delayFunc = func => {
        if (func) {
            setTimeout(func, 1000)
        }
    }

    initConstructorIngredients = () => {
        const constructorCategories = this.props.constructorCategories[this.props.selectedCategory.Id]
        let constructorIngredients = {}

        for (const constructorCategory of constructorCategories) {
            const ingredients = this.props.ingredients[constructorCategory.Id]
            constructorIngredients[constructorCategory.Id] = {
                constructorCategory: constructorCategory,
                minCountIngredient: constructorCategory.MinCountIngredient,
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

    componentDidUpdate = (prevProps) => {
        if (this.props.selectedCategory != prevProps.selectedCategory) {
            this.props.navigation.setParams({ categoryName: this.props.selectedCategory.Name })
        }

        this.changeTotalCountProductInBasket()
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

    getConstructorProductForBasket = () => {
        let price = 0

        for (const constructorCategoryId in this.state.constructorIngredients) {
            const categoryConstructor = this.state.constructorIngredients[constructorCategoryId]
            for (const ingredient of categoryConstructor.ingredients) {
                price += ingredient.Price * categoryConstructor.ingredientsCount[ingredient.Id]
            }
        }

        return {
            category: this.props.selectedCategory,
            price: priceValid(price),
            constructorIngredients: cloneObject(this.state.constructorIngredients),
            count: this.state.count
        }
    }

    toggleConstructorProductInBasket = () => {
        this.showSuccessAnimation()
        const basketProduct = this.getConstructorProductForBasket()
        const basketConstructorProductModify = { ...this.props.basketConstructorProducts }
        const uniqId = generateRandomString(10)
        basketConstructorProductModify[uniqId] = {
            uniqId,
            category: basketProduct.category,
            price: basketProduct.price,
            count: basketProduct.count,
            constructorIngredients: basketProduct.constructorIngredients
        }

        this.props.toggleConstructorProductInBasket(basketConstructorProductModify)
    }

    render() {
        return (
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
                {
                    this.state.showSuccessAnimation &&
                    <View style={Style.successContainer}>
                        <View style={Style.success}>
                            <LottieView
                                style={Style.loader}
                                source={require('../../../animation/src/success-2.json')}
                                autoPlay
                                loop={false}
                                onAnimationFinish={() => this.delayFunc(this.hideSuccessAnimation)}
                                resizeMode='contain'
                                speed={1} />
                        </View>
                    </View>
                }
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
                            onToggleConstructorProducts={this.toggleConstructorProductInBasket}
                        />
                    </View>
                </Animated.ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverDomain: state.appSetting.serverDomain,
        currencyPrefix: state.appSetting.currencyPrefix,
        selectedCategory: state.catalog.selectedCategory,
        basketProducts: state.basket.basketProducts,
        basketConstructorProducts: state.basket.basketConstructorProducts,
        basketProductsWithOptions: state.basket.basketProductsWithOptions,
        totalCountProducts: state.basket.totalCountProducts,
        style: state.style,
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        constructorCategories: state.main.constructorCategories,
        ingredients: state.main.ingredients,
    }
}

const mapActionToProps = {
    toggleConstructorProductInBasket,
    changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(ConstructorProductsScreen)
