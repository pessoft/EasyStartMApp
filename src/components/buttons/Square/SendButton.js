import React from 'react'
import { IconButton } from './IconButton'
import SendIco from '../../../images/font-awesome-svg/arriw-circle-up.svg'

export class SendButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={SendIco}
      />
    )
  }
}