import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
    Dimensions
} from 'react-native'
import Styles from './style'
import { springAnimation } from '../../animation/springAnimation'
const { width } = Dimensions.get('window')

export class CategoryItem extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            xValue: new Animated.Value(width - 100)
        }
    }

    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    componentDidMount() {
        if (this.props.animation.useAnimation)
            springAnimation(this.state.xValue, 0, this.props.animation.delay)
        else
            this.setState({ xValue: 0 })
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                style={[
                    Styles.bodyItem,
                    this.props.style.theme.dividerColor]}
                onPress={this.onPress}>
                <Animated.View
                    style={[
                        Styles.directionRow,
                        { left: this.state.xValue }]}
                >
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
                </Animated.View>
            </TouchableHighlight >
        )
    }
}