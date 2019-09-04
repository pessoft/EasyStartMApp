import React from 'react'
import {
  TouchableWithoutFeedback,
  Text,
  Animated,
} from 'react-native'
import Styles from './style'
import { stringLiteralTypeAnnotation } from '@babel/types';
import { timingAnimation } from '../../animation/timingAnimation'


export class SimpleListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fontSizeCity: new Animated.Value(this.props.selected ? this.props.style.fontSize.h6.fontSize : this.props.style.fontSize.h9.fontSize)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected != prevProps.selected) {
      let toValue = this.props.selected ? this.props.style.fontSize.h6.fontSize : this.props.style.fontSize.h9.fontSize
      timingAnimation(this.state.fontSizeCity, toValue)
    }
  }

  onPress = () => {
    if (this.props.onPress)
      this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
        onPress={this.onPress}
        style={Styles.bodyItem}>
        <Animated.Text style={[
          Styles.text,
          Styles.textWrap,
          this.props.style.theme.dividerColor,
          { fontSize: this.state.fontSizeCity },
          // this.props.selected ? this.props.style.fontSize.h6 : this.props.style.fontSize.h9,
          this.props.selected ? Styles.primaryTextColor : this.props.style.theme.secondaryTextColor]}>
          {this.props.text}
        </Animated.Text>
      </TouchableWithoutFeedback  >
    )
  }
}