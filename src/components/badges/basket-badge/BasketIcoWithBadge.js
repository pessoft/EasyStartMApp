import React from 'react'
import { View, Text, Animated } from 'react-native'
import Style from './style'
import IcoShoppingBasket from '../../../images/font-awesome-svg/shopping-basket.svg'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import { springAnimation } from '../../../animation/springAnimation'

class BasketIcoWithBadge extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: this.props.animation ? new Animated.Value(0) : 0,
    }
  }

  componentDidUpdate = () => {
    if (this.props.animation)
      this.toggleAnimationBadge()
    else
      this.toggleBadge()
  }

  toggleAnimationBadge = () => {
    if (this.props.totalCountProducts == 0)
      timingAnimation(this.state.showScaleAnimation, 0, 200)
    else
      springAnimation(this.state.showScaleAnimation, 1, 200, 2.5)
  }

  toggleBadge = () => {
    if (this.props.totalCountProducts == 0
      && this.state.showScaleAnimation != 0)
      this.setState({ showScaleAnimation: 0 })
    else if (this.props.totalCountProducts == 1
      && this.state.showScaleAnimation != 1)
      this.setState({ showScaleAnimation: 1 })
  }

  render() {
    return (
      <View>
        <IcoShoppingBasket width={this.props.width} height={this.props.height} color={this.props.color} />
        <Animated.View style={[
          Style.badge,
          this.props.style.theme.accentColor,
          {
            opacity: this.state.showScaleAnimation,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
          <Text style={[
            this.props.style.theme.textPrimaryColor,
            this.props.style.fontSize.h12
          ]}>{`${this.props.totalCountProducts} ${this.props.prefix}`}</Text>
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    totalCountProducts: state.checkout.totalCountProducts
  }
}

export default connect(mapStateToProps)(BasketIcoWithBadge)