import React from 'react'
import {
    View,
    Text,
    Image,
    Animated
} from 'react-native'
import Style from './style'
import UserPhotoDefaultIcon from '../../images/font-awesome-svg/user-circle.svg'
import ClockIcon from '../../images/font-awesome-svg/clock.svg'
import { timingAnimation } from '../../animation/timingAnimation'
import { getSVGColor } from '../../helpers/color-helper'

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    componentDidMount() {
        if (this.props.animation &&
            this.props.animation.useAnimation)
            timingAnimation(this.state.showScaleAnimation, 1, this.props.animation.duration, true)
        else
            this.setState({ showScaleAnimation: 1 })
    }

    renderUserPhoto = () => {
        if (this.props.sourceUserPhoto)
            return <Image style={Style.userPhoto} source={this.props.sourceUserPhoto} />
        else
            return <UserPhotoDefaultIcon
                width={35} height={35}
                style={Style.userPhoto}
                color={getSVGColor(this.props.style.theme.secondaryTextColor.color)} />
    }

    render() {
        return (
            <Animated.View style={[
                Style.reviewItem,
                this.props.style.theme.backdoor,
                this.props.style.theme.dividerColor,
                { transform: [{ scale: this.state.showScaleAnimation }] }
            ]}>
                {this.renderUserPhoto()}
                <View style={Style.reviewContainer}>
                    <Text style={[
                        Style.header,
                        this.props.style.fontSize.h8,
                        { color: this.props.style.theme.accentOther.backgroundColor }]}
                    >
                        {this.props.header}
                    </Text>
                    <View style={Style.reviewDateContainer}>
                        <ClockIcon
                            width={10}
                            height={10}
                            color={getSVGColor(this.props.style.theme.secondaryTextColor.color)}
                        />
                        <Text style={[
                            Style.reviewDate,
                            this.props.style.theme.secondaryTextColor,
                            this.props.style.fontSize.h10]}
                        >
                            {this.props.date}
                        </Text>
                    </View>
                    <Text style={[
                        this.props.style.theme.primaryTextColor,
                        this.props.style.fontSize.h9]}>{this.props.text}</Text>
                </View>
            </Animated.View>
        )
    }
}