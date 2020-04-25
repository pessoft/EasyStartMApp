import React from 'react'
import { IconButton } from './IconButton'
import Icon from '../../../images/font-awesome-svg/instagram.svg'

export class InstagrammButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={Icon}
      />
    )
  }
}