import React from 'react'
import { View, Text, Animated,TouchableOpacity } from 'react-native'
import Style from './style'
import IcoShoppingBasket from '../../../images/font-awesome-svg/shopping-basket.svg'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import { springAnimation } from '../../../animation/springAnimation'
import { SHOPPING_BASKET } from '../../../navigation/pointsNavigate'

class BasketIcoWithBadge extends React.Component {
  constructor(props) {
    super(props)

    const value = this.props.totalCountProducts == 0 ? 0 : 1
    this.state = {
      showScaleAnimation: this.props.animation ? new Animated.Value(value) : value,
    }
  }

  goToBasketScreen = () => this.props.navigation.navigate(SHOPPING_BASKET)

  componentDidUpdate = (prevProps) => {
    if (prevProps.totalCountProducts != this.props.totalCountProducts) {
      if (this.props.animation)
        this.toggleAnimationBadge()
      else
        this.toggleBadge()
    }
  }

  toggleAnimationBadge = () => {
    if (this.props.totalCountProducts == 0)
      timingAnimation(this.state.showScaleAnimation, 0, 200)
    else
      springAnimation(this.state.showScaleAnimation, 1, 100, 2.5)
  }

  toggleBadge = () => {
    if (this.props.totalCountProducts == 0
      && this.state.showScaleAnimation != 0)
      this.setState({ showScaleAnimation: 0 })
    else if (this.props.totalCountProducts == 1
      && this.state.showScaleAnimation != 1)
      this.setState({ showScaleAnimation: 1 })
  }

  getPrefix = () => {
    if (this.props.prefix)
      return ` ${this.props.prefix}`

    return ''
  }

  getFotSize = () => {
    if (this.props.prefix)
      return this.props.style.fontSize.h12

    return this.props.style.fontSize.h11
  }

  render() {
    return (
      <TouchableOpacity onPress={this.goToBasketScreen} style={this.props.containerStyle}>
        <IcoShoppingBasket width={this.props.width} height={this.props.height} color={this.props.color || this.props.style.theme.textPrimaryColor.color} />
        <Animated.View
          key={new Date().getTime().toString()}
          style={[
            Style.badge,
            {
              backgroundColor: this.props.style.theme.errorTextColor.color
            },
            {
              opacity: this.state.showScaleAnimation,
              transform: [{ scale: this.state.showScaleAnimation }]
            }
          ]}>
          <Text style={[
            this.props.style.theme.textPrimaryColor,
            this.getFotSize()
          ]}>{`${this.props.totalCountProducts}${this.getPrefix()}`}</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => {
  return {
    totalCountProducts: state.basket.totalCountProducts,
    style: state.style,
  }
}

export default connect(mapStateToProps)(BasketIcoWithBadge)
