import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Animated
} from 'react-native'
import { CategoryItem } from '../../components/category/CategoryItem';
import { setSelectedCategory, setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCTS } from '../../navigation/pointsNavigate';
import { timingAnimation } from '../../animation/timingAnimation'
import {Text} from 'react-native'
import VirtualMoneyButton from '../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'

class CategoriesScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Категории',
        headerRight: () => <VirtualMoneyButton />
    }

    constructor(props) {
        super(props)
        this.props.setSelectedProduct({})
        this.props.setSelectedCategory({})

        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    componentDidMount = () => {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    componentDidUpdate = () => {
        if (Object.keys(this.props.selectedCategory).length > 0
            && this.props.selectedCategory.Id > 0) {
            this.props.navigation.navigate(PRODUCTS)
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

    getImageSource = imagePath => {
        return { uri: `${this.props.serverDomain}${imagePath}` }
    }

    categoriesTransform = () => {
        const categories = []
        for (let category of this.props.categories) {
            categories[category.OrderNumber - 1] = {
                key: `${category.Id}`,
                caption: category.Name,
                imageSource: this.getImageSource(category.Image)
            }
        }

        return categories
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
            <Animated.ScrollView
                style={[
                    { opacity: this.state.showScaleAnimation },
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                <FlatList
                    windowSize={4}
                    removeClippedSubviews={true}
                    initialNumToRender={4}
                    data={this.categoriesTransform()}
                    renderItem={this.renderItem}
                />
            </Animated.ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverDomain: state.appSetting.serverDomain,
        categories: state.main.categories,
        selectedCategory: state.catalog.selectedCategory,
        style: state.style
    }
}

const mapActionToProps = {
    setSelectedCategory,
    setSelectedProduct
}

export default connect(mapStateToProps, mapActionToProps)(CategoriesScreen)