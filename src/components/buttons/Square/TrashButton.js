import React from 'react'
import { IconButton } from './IconButton'
import TrashIco from '../../../images/font-awesome-svg/trash-alt.svg'

export class TrashButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={TrashIco}
      />
    )
  }
}