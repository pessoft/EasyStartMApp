import React from 'react'
import {connect} from 'react-redux'
import {Text} from 'react-native'
class CategoriesScreen extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Text>Hello main tab</Text>
            </React.Fragment>
        )
    }
}

export default connect()(CategoriesScreen)