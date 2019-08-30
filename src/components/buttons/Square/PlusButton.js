import React from 'react'
import { IconButton } from './IconButton'
import PlusIco from '../../../images/font-awesome-svg/plus.svg'

export class PlusButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={PlusIco}
      />
    )
  }
}