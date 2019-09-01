import React from 'react'
import { View, Text, Image } from 'react-native'
import Styles from './style'
import UserPhotoDefaultIco from '../../images/font-awesome-svg/user-circle.svg'
import ClockIco from '../../images/font-awesome-svg/clock.svg'

export class ReviewItem extends React.Component {

    renderUserPhoto = () => {
        if (this.props.sourceUserPhoto)
            return <Image style={Styles.userPhoto} source={this.props.sourceUserPhoto} />
        else
            return <UserPhotoDefaultIco style={Styles.userPhoto} color={'#bbbcbc'}/>
    }

    render() {
        return (
            <View style={Styles.reviewItem}>
                {this.renderUserPhoto()}
                <View style={Styles.reviewContainer}>
                    <Text style={[Styles.header, Styles.h5]}>{this.props.header}</Text>
                    <View style={Styles.reviewDateContainer}>
                        <ClockIco width={10} height={10} color={'#bbbcbc'}/>
                        <Text style={[Styles.reviewDate, Styles.h7]}>{this.props.date}</Text>
                    </View>

                    <Text style={[Styles.reviewText, Styles.h5]}>{this.props.text}</Text>

                </View>
            </View>
        )
    }
}