import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'

const width = Math.round(Dimensions.get('window').width);

class CheckoutCompleteScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Формирование заявки',
  }

  render() {
    return (
      <View
        style={Style.container}>
        <LottieView
          style={Style.loader}
          source={require('../../../animation/src/food-loader.json')}
          autoPlay
          // loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} />
        <LottieView
          style={Style.success}
          source={require('../../../animation/src/success.json')}
          autoPlay
          // loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} />
        <LottieView
          style={Style.error}
          source={require('../../../animation/src/error.json')}
          autoPlay
          // loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.marginText
          ]}     >
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