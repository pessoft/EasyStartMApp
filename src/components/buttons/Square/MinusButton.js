import React from 'react'
import { IconButton } from './IconButton'
import MinusIco from '../../../images/font-awesome-svg/minus.svg'

export class MinusButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={MinusIco}
      />
    )
  }
}