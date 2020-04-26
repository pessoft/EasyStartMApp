import React from 'react'
import { IconButton } from './IconButton'
import Icon from '../../../images/font-awesome-svg/bars.svg'

export class BarsButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={Icon}
      />
    )
  }
}