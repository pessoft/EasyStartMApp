import React from 'react'
import {
    TouchableHighlight,
    Image,
    ImageBackground,
    Text,
    View,
    Animated
} from 'react-native'
import Style from './style'
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
                underlayColor={this.props.style.theme.backdoor.backgroundColor}
                style={[
                    Style.bodyItem,
                    this.props.style.theme.backdoor,
                    this.props.style.theme.dividerColor,
                    this.props.style.theme.shadowColor,
                ]}
                onPress={this.onPress}>
                <Animated.View
                    style={[
                        Style.directionRow,
                        { transform: [{ scale: this.state.showScaleAnimation }] }]}
                >
                    <Image
                        source={this.props.imageSource}
                        style={[Style.catalogImage]}
                    />
                    <View style={[
                        Style.captionContainer,
                        this.props.style.theme.dividerColor,
                        this.props.style.theme.backdoorTransparent]}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={[
                                this.props.style.fontSize.h8,
                                Style.captionCatalog,
                                this.props.style.theme.primaryTextColor]}>
                            {this.props.caption}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableHighlight>
        )
    }
}