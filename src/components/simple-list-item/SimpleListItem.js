import React from 'react'
import {
  TouchableWithoutFeedback,
  Text,
  Animated,
} from 'react-native'
import Style from './style'
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
      let toValue = this.props.selected ? this.props.style.fontSize.h5.fontSize : this.props.style.fontSize.h8.fontSize
      timingAnimation(this.state.fontSizeCity, toValue, 160, false)
    }
  }

  onPress = () => {
    if (this.props.onPress)
      this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        underlayColor={this.props.style.theme.backdoor.backgroundColor}
        onPress={this.onPress}
        style={Style.bodyItem}>
        <Animated.Text style={[
          Style.text,
          Style.textWrap,
          this.props.style.theme.dividerColor,
          { fontSize: this.state.fontSizeCity },
          this.props.selected ? this.props.style.theme.primaryTextColor : this.props.style.theme.secondaryTextColor]}>
          {this.props.text}
        </Animated.Text>
      </TouchableWithoutFeedback>
    )
  }
}