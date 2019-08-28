import React from 'react'
import {connect} from 'react-redux'

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

    constructor(props){
        super(props)
        this.props.navigation.setParams({categoryName: this.props.selectedCategory.Name})
    }

    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverURL: state.appSetting.serverURL,
        products: state.main.products,
        selectedCategory: state.catalog.selectedCategory,
        selectedProduct: state.catalog.selectedCategory
    }
}

export default connect(mapStateToProps)(ProductsScreen)