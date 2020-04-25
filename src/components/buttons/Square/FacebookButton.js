import React from 'react'
import { IconButton } from './IconButton'
import Icon from '../../../images/font-awesome-svg/facebook-f.svg'

export class FacebookButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={Icon}
      />
    )
  }
}