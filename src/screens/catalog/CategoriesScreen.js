import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, FlatList } from 'react-native'
import { CategoryItem } from '../../components/category/CategoryItem';
import { setSelectedCatagory, setSelectedProduct } from '../../store/catalog/actions'
import { PRODUCTS } from '../../navigation/pointsNavigate';



class CategoriesScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Категории',
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        }
    }

    componentDidUpdate = () => {
        if (Object.keys(this.props.selectedCategory).length > 0
            && this.props.selectedCategory.Id > 0) {
            this.props.navigation.navigate(PRODUCTS)
        }
    }

    onSelectedCategory = categoryId => {
        this.props.setSelectedCatagory(this.getCategoryById(categoryId))
        this.props.setSelectedProduct({})
    }

    getCategoryById = id => {
        const results = this.props.categories.filter(p => p.Id == id)

        if (results.length > 0)
            return results[0]

        return {}
    }

    getImageSource = imagePath => {
        return { uri: `${this.props.serverURL}${imagePath}` }
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
            id={item.key}
            caption={item.caption}
            imageSource={item.imageSource}
            onPress={this.onSelectedCategory}
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
                    data={this.categoriesTransform()}
                    renderItem={this.renderItem}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverURL: state.appSetting.serverURL,
        categories: state.main.categories,
        selectedCategory: state.catalog.selectedCategory
    }
}

const mapActionToProps = {
    setSelectedCatagory,
    setSelectedProduct
}

export default connect(mapStateToProps, mapActionToProps)(CategoriesScreen)