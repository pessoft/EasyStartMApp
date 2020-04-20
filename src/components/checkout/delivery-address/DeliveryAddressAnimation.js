import React from 'react'
import { Animated } from 'react-native'
import { DeliveryAddress } from './DeliveryAddress'
import { timingAnimation } from '../../../animation/timingAnimation'

export class DeliveryAddressAnimation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShow: props.isShow,
      showScaleAnimation: new Animated.Value(props.isShow ? 1 : 0),
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.isShow != this.props.isShow) {
      if (this.props.isShow) {
        const show = () => timingAnimation(this.state.showScaleAnimation, 1, 200, true)
        this.toggleDeliveryAddress(show)
      }
      else
        timingAnimation(this.state.showScaleAnimation, 0, 200, true, () => this.toggleDeliveryAddress())
    }
  }


  toggleDeliveryAddress = callback => {
    this.setState(
      {
        isShow: !this.state.isShow,
        showScaleAnimation: new Animated.Value(this.state.isShow ? 1 : 0)
      },
      () => {
        if (callback)
          callback()
      })
  }

  render() {
    if (this.state.isShow) {
      return (
        <Animated.View
          style={[
            {
              opacity: this.state.showScaleAnimation,
              transform: [{ scale: this.state.showScaleAnimation }]
            }
          ]}>
          <DeliveryAddress
            address={this.props.address}
            style={this.props.style}
            changeDeliveryAddress={this.props.changeDeliveryAddress}
            isHideArea={this.props.isHideArea}
            areaDeliveries={this.props.areaDeliveries}
            saveDeliveryAddress={this.props.saveDeliveryAddress}
          />
        </Animated.View>
      )
    } else
      return null
  }
}