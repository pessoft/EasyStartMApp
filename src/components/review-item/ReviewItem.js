import React from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions
} from 'react-native'
import Styles from './style'
import UserPhotoDefaultIco from '../../images/font-awesome-svg/user-circle.svg'
import ClockIco from '../../images/font-awesome-svg/clock.svg'
import { springAnimation } from '../../animation/springAnimation'

const { width } = Dimensions.get('window')

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            xValue: new Animated.Value(width - 100)
        }
    }

    componentDidMount() {
        if (this.props.animation.useAnimation)
            springAnimation(this.state.xValue, 0, this.props.animation.delay)
        else
            this.setState({ xValue: 0 })
    }

    renderUserPhoto = () => {
        if (this.props.sourceUserPhoto)
            return <Image style={Styles.userPhoto} source={this.props.sourceUserPhoto} />
        else
            return <UserPhotoDefaultIco style={Styles.userPhoto} color={'#bbbcbc'} />
    }

    render() {
        return (
            <Animated.View style={[
                Styles.reviewItem,
                this.props.style.theme.dividerColor,
                { left: this.state.xValue }
            ]}>
                {this.renderUserPhoto()}
                <View style={Styles.reviewContainer}>
                    <Text style={[
                        Styles.header,
                        this.props.style.fontSize.h8,
                        { color: this.props.style.theme.darkPrimaryColor.backgroundColor }]}
                    >
                        {this.props.header}
                    </Text>
                    <View style={Styles.reviewDateContainer}>
                        <ClockIco
                            width={10}
                            height={10}
                            color={this.props.style.theme.secondaryTextColor.color}
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