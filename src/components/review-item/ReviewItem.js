import React from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    processColor
} from 'react-native'
import Styles from './style'
import UserPhotoDefaultIco from '../../images/font-awesome-svg/user-circle.svg'
import ClockIco from '../../images/font-awesome-svg/clock.svg'
import { timingAnimation } from '../../animation/timingAnimation'

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    getColor = color => {
        if(Platform.OS === 'ios') {
            return processColor(color)
        }

        return color
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
            return <Image style={Styles.userPhoto} source={this.props.sourceUserPhoto} />
        else
            return <UserPhotoDefaultIco style={Styles.userPhoto} color={this.getColor('#bbbcbc')} />
    }

    render() {
        return (
            <Animated.View style={[
                Styles.reviewItem,
                this.props.style.theme.dividerColor,
                { transform: [{ scale: this.state.showScaleAnimation }] }
            ]}>
                {this.renderUserPhoto()}
                <View style={Styles.reviewContainer}>
                    <Text style={[
                        Styles.header,
                        this.props.style.fontSize.h8,
                        { color: this.props.style.theme.accentColor.backgroundColor }]}
                    >
                        {this.props.header}
                    </Text>
                    <View style={Styles.reviewDateContainer}>
                        <ClockIco
                            width={10}
                            height={10}
                            color={processColor(this.props.style.theme.secondaryTextColor.color)}
                        />
                        <Text style={[
                            Styles.reviewDate,
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