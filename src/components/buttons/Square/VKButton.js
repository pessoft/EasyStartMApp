import React from 'react'
import { IconButton } from './IconButton'
import Icon from '../../../images/font-awesome-svg/vk.svg'

export class VKButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={Icon}
      />
    )
  }
}