import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated,
    ScrollView,
    Platform
} from 'react-native'
import { CategoryItem } from '../../components/category/CategoryItem'
import { CategoryListItem } from '../../components/category/CategoryListItem'
import { setSelectedCategory, setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCTS, CONSTRUCTOR_PRODUCTS, CASHBACK_PROFILE } from '../../navigation/pointsNavigate'
import { timingAnimation } from '../../animation/timingAnimation'
import VirtualMoneyButton from '../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { MainBannerCarousel } from '../../components/category/main-banner-carousel/MainBannerCarousel';
import { CategoryType } from '../../helpers/type-category'
import { notificationActionDone } from '../../store/FCM/actions'
import FCMManagerComponent from '../../fcm/components/fcm-manager/fcm-manger-component'
import { NewsType } from '../../helpers/news-type'
import ViewContainerCategoryChanger from '../../components/view-container-changer/ViewContainerCategoryChanger'
import { ViewContainerType } from '../../helpers/view-container-type'
import { NewsInfo } from '../../components/raw-bottom-sheets/news-info/NewsInfo'
import BasketIcoWithBadge from '../../components/badges/basket-badge/BasketIcoWithBadge'
import { BarsButton } from '../../components/buttons/Square/BarsButton'

class CategoriesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const style = navigation.getParam('style', null)
        const title = navigation.getParam('title', null) || 'Меню'

        return {
            headerTitle: title,
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
            style: this.props.style,
            title: this.props.appSetting.appTitle,
        })

        this.props.setSelectedProduct({})
        this.props.setSelectedCategory({})

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            news: null
        }
    }

    goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.setSelectedCategory({})
        });

        if (this.props.fcmNotificationAction) {
            this.props.fcmNotificationAction()
            this.props.notificationActionDone()
        }

        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    componentWillUnmount() {
        this.focusListener.remove();
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

    onPressBanner = (type, data) => {
        this.setState({ news: data })
    }

    renderListItem = ({ item }) => {
        return <CategoryListItem
            style={this.props.style}
            id={item.key}
            caption={item.caption}
            imageSource={item.imageSource}
            onPress={this.onSelectedCategory}
        />
    }

    renderGridItem = ({ item }) => {
        return <CategoryItem
            style={this.props.style}
            id={item.key}
            caption={item.caption}
            imageSource={item.imageSource}
            onPress={this.onSelectedCategory}
        />
    }

    getFlatListPerformanceProperty = () => {
        if (Platform.OS == 'ios')
            return {}
        else
            return {
                windowSize: 4,
                removeClippedSubviews: true,
                initialNumToRender: 4,
            }
    }

    isShowBanner = () => {
        let isShow = (this.props.stocks.length > 0 &&
            this.props.promotionSetting.IsShowStockBanner) ||
            (this.props.news.length > 0 &&
                this.props.promotionSetting.IsShowNewsBanner)

        return isShow
    }

    getDataForBanner = () => {
        let items = {}

        if (this.props.stocks.length > 0 &&
            this.props.promotionSetting.IsShowStockBanner) {
            items[NewsType.stock] = this.props.stocks
        }

        if (this.props.news.length > 0 &&
            this.props.promotionSetting.IsShowNewsBanner) {
            items[NewsType.news] = this.props.news
        }

        return items
    }

    renderListView = () => {
        return (
            <FlatList
                key={ViewContainerType.list.toString()}
                style={{ marginTop: 12 }}
                {...this.getFlatListPerformanceProperty()}
                data={this.categoriesTransform()}
                renderItem={this.renderListItem}
            />
        )
    }

    renderGridView = () => {
        return (
            <FlatList
                key={ViewContainerType.grid.toString()}
                style={{ marginTop: 12 }}
                {...this.getFlatListPerformanceProperty()}
                data={this.categoriesTransform()}
                renderItem={this.renderGridItem}
                numColumns={2}
            />
        )
    }

    renderContent = () => {
        switch (this.props.selectedCategoryViewType) {
            case ViewContainerType.list:
                return this.renderListView()
            case ViewContainerType.grid:
                return this.renderGridView()
        }
    }

    onCloseSheetNewsInfo = () => this.setState({ news: null })

    render() {
        return (
            <Animated.View
                style={[
                    {
                        flex: 1,
                        alignItems: 'center',
                        opacity: this.state.showScaleAnimation,
                        transform: [{ scale: this.state.showScaleAnimation }]
                    }]}>
                <FCMManagerComponent navigation={this.props.navigation} />
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {
                        this.isShowBanner() &&
                        <MainBannerCarousel
                            style={this.props.style}
                            items={this.getDataForBanner()}
                            onPress={this.onPressBanner}
                        />
                    }

                    {this.renderContent()}
                </ScrollView>

                <NewsInfo
                    style={this.props.style}
                    news={this.state.news}
                    toggle={!!this.state.news}
                    close={this.onCloseSheetNewsInfo}
                />
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        appSetting: state.appSetting,
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        promotionSetting: state.main.promotionSetting,
        serverDomain: state.appSetting.serverDomain,
        categories: state.main.categories,
        selectedCategory: state.catalog.selectedCategory,
        style: state.style,
        stocks: state.main.stocks,
        news: state.main.news,
        fcmNotificationAction: state.fcm.notificationAction,
        selectedCategoryViewType: state.appSetting.selectedCategoryViewType,
    }
}

const mapActionToProps = {
    setSelectedCategory,
    setSelectedProduct,
    notificationActionDone
}

export default connect(mapStateToProps, mapActionToProps)(CategoriesScreen)