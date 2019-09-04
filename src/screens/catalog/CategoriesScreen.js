import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, FlatList } from 'react-native'
import { CategoryItem } from '../../components/category/CategoryItem';
import { setSelectedCatagory, setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCTS } from '../../navigation/pointsNavigate';



class CategoriesScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Категории',
    }

    constructor(props) {
        super(props)
        this.props.setSelectedProduct({})
        this.props.setSelectedCatagory({})
    }

    componentDidUpdate = () => {
        if (Object.keys(this.props.selectedCategory).length > 0
            && this.props.selectedCategory.Id > 0) {
            this.props.navigation.navigate(PRODUCTS)
        }
    }

    onSelectedCategory = categoryId => {
        this.props.setSelectedCatagory({})
        this.props.setSelectedCatagory(this.getCategoryById(categoryId))
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
        let delay = 60
        const animationMaxCount = 5
        for (let category of this.props.categories) {
            categories[category.OrderNumber - 1] = {
                animation: {
                    delay: delay * (category.OrderNumber - 1),
                    useAnimation: category.OrderNumber < animationMaxCount
                },
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
            animation={item.animation}
            caption={item.caption}
            imageSource={item.imageSource}
            onPress={this.onSelectedCategory}
        />
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    windowSize={3}
                    removeClippedSubviews={true}
                    initialNumToRender={3}
                    data={this.categoriesTransform()}
                    renderItem={this.renderItem}
                />
            </ScrollView>
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
    setSelectedCatagory,
    setSelectedProduct
}

export default connect(mapStateToProps, mapActionToProps)(CategoriesScreen)