import React from 'react'
import { TouchableHighlight, Image, Text, View } from 'react-native'
import Styles from './style'

export class CategoryItem extends React.PureComponent {
    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                style={[Styles.bodyItem, this.props.style.theme.dividerColor]}
                onPress={this.onPress}>
                <View style={Styles.directionRow}>
                    <Image
                        source={this.props.imageSource}
                        style={[Styles.catalogImage]}
                    />
                    <Text style={[
                        this.props.style.fontSize.h6,
                        Styles.captionCatalog,
                        this.props.style.theme.primaryTextColor]}>
                        {this.props.caption}
                    </Text>
                </View>
            </TouchableHighlight >
        )
    }
}