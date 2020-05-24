import React from 'react'
import { IconButton } from './IconButton'
import ListIcon from '../../../images/font-awesome-svg/th-list.svg'

export class ListViewButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={ListIcon}
      />
    )
  }
}