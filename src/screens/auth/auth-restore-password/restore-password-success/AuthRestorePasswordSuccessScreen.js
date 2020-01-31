import React from 'react'
import { connect } from 'react-redux'
import { Animated, View, Text, Dimensions, Button } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'
import { timingAnimation } from '../../../../animation/timingAnimation'
import { AUTH_LOGIN } from '../../../../navigation/pointsNavigate'

class AuthRestorePasswordSuccessScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimationSuccess: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimationSuccess, 1, 200, true)
  }

  goToAuthLoginPage = () => this.props.navigation.navigate(AUTH_LOGIN)

  renderSuccess = () => {
    return (
      <Animated.View
        style={[
          Style.container,
          {
            opacity: this.state.showScaleAnimationSuccess,
            transform: [{ scale: this.state.showScaleAnimationSuccess }]
          }]}>
        <LottieView
          style={Style.success}
          source={require('../../../../animation/src/success-send-email.json')}
          autoPlay
          loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={0.7}
        />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText,
          ]}>
          Пароль отправлен
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText
          ]}>
          на ваш e-mail
        </Text>
      </Animated.View>
    )
  }

  renderButtonAuth = () => {
    return (
      <View style={[Style.button]}>
        <Button
          title='Войти'
          onPress={this.goToAuthLoginPage}
          color={Platform.OS == 'ios' ?
            this.props.style.theme.primaryTextColor.color :
            this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </View>
    )
  }

  render() {
    return (
      <View style={[
        this.props.style.theme.themeBody,
        Style.container,
      ]}>
        {this.renderSuccess()}
        {this.renderButtonAuth()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
  }
}

export default connect(mapStateToProps)(AuthRestorePasswordSuccessScreen)