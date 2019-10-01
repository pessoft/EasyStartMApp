import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  ScrollView,
  Button,
  View,
  Text,
  Animated,
  Platform
} from 'react-native'
import Styles from './style'
import { timingAnimation } from '../../../animation/timingAnimation'

class CheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Оформление заказа',
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
      <Animated.View
        style={[
          {
            marginTop: 5,
            opacity: this.state.showScaleAnimation,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        <ScrollView>
        </ScrollView>
      </Animated.View>
    )
  }
}

export default connect()(CheckoutScreen)