import React from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'

class PersonalAccountScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Личный кабинет',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  render() {
    return (
      <Animated.ScrollView
        style={[
          {
            opacity: this.state.showScaleAnimation,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}
      >

      </Animated.ScrollView>
    )
  }
}

export default connect()(PersonalAccountScreen)