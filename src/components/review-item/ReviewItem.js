import React from 'react'
import { View, Text } from 'react-native'
import Styles from './style'

export class ReviewItem extends React.Component {

    render() {
        return (
            <View style={Styles.reviewItem}>
                <Text style={[Styles.header, Styles.h5]}>{this.props.header}</Text>
                <Text style={[Styles.reviewText, Styles.h5]}>{this.props.text}</Text>
                <Text style={[Styles.reviewDate, Styles.h7]}>{this.props.date}</Text>
            </View>
        )
    }
}