import React from 'react'
import { connect } from 'react-redux'
import { Animated, View, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'

class CheckoutCompleteScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Формирование заявки',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  render() {
    return (
      <View style={[
        this.props.style.theme.themeBody,
        Style.container,
      ]}>
        <Animated.View
          style={[
            Style.container,
            {
              opacity: this.state.showScaleAnimation,
              transform: [{ scale: this.state.showScaleAnimation }]
            }]}>
          <LottieView
            style={Style.loader}
            source={require('../../../animation/src/food-loader.json')}
            autoPlay
            resizeMode='cover'
            autoSize={true}
            speed={1.5} />
          {/* <LottieView
          style={Style.success}
          source={require('../../../animation/src/success.json')}
          autoPlay
          loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} />
        <LottieView
          style={Style.error}
          source={require('../../../animation/src/error.json')}
          autoPlay
          loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} /> */}
          <Text
            style={[
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8,
              Style.marginText,
            ]}>
            Пожалуйста подождите
        </Text>
          <Text
            style={[
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8,
              Style.marginText
            ]}>
            Идет формирование заявки...
        </Text>
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(CheckoutCompleteScreen)