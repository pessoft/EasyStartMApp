import React from 'react'
import {
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Text,
    View,
    Animated,
    Dimensions
} from 'react-native'
import Style from './style'
import { timingAnimation } from '../../animation/timingAnimation'

const min320 = Dimensions.get('window').width <= 320

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
            <TouchableWithoutFeedback
                onPress={this.onPress}>
                <View style={[
                    Style.bodyItem,
                    this.props.style.theme.dividerColor,
                ]}>
                    <Animated.View
                        style={[
                            Style.directionRow,
                            { transform: [{ scale: this.state.showScaleAnimation }] }]}
                    >
                        <View style={[
                            Style.imageContainer,
                            this.props.style.theme.backdoor,
                            this.props.style.theme.shadowColor
                        ]}>
                            <Image
                                source={this.props.imageSource}
                                style={[Style.catalogImage]}
                            />
                        </View>
                        <View style={[
                            Style.captionContainer,
                            this.props.style.theme.dividerColor,
                        ]}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={[
                                    min320 ?
                                        this.props.style.fontSize.h9 :
                                        this.props.style.fontSize.h8,
                                    Style.captionCatalog,
                                    this.props.style.theme.primaryTextColor]}>
                                {this.props.caption}
                            </Text>
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}