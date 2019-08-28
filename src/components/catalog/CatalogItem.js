import React from 'react'
import { TouchableHighlight, Image, Text, View } from 'react-native'
import Styles from './style'

export class CatalogItem extends React.Component {
    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    render() {
        return (
            <TouchableHighlight
                style={[Styles.bodyItem, Styles.ph_10]}
                onPress={this.onPress}>
                <View style={Styles.directionRow}>
                    <Image
                        source={this.props.imageSource}
                        style={[Styles.imageNormalSize, Styles.rounded]}
                    />
                    <Text style={[Styles.ph_10, Styles.textWrap]}>
                        {this.props.caption}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}