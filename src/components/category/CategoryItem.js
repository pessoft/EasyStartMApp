import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated
} from 'react-native'
import Styles from './style'
import { timingAnimation } from '../../animation/timingAnimation'

export class CategoryItem extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    componentDidMount() {
        if (this.props.animation &&
            this.props.animation.useAnimation)
            timingAnimation(this.state.showScaleAnimation, 1, this.props.animation.duration, true)
        else
            this.setState({ showScaleAnimation: 1 })
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
                        { transform: [{ scale: this.state.showScaleAnimation }] }]}
                >
                    <Image
                        source={this.props.imageSource}
                        style={[Styles.catalogImage]}
                    />
                    <View style={[
                        Styles.captionContainer,
                        this.props.style.theme.dividerColor,]}>
                        <Text style={[
                            this.props.style.fontSize.h6,
                            Styles.captionCatalog,
                            this.props.style.theme.primaryTextColor]}>
                            {this.props.caption}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableHighlight >
        )
    }
}