import React from 'react'
import { IconButton } from './IconButton'
import GridIcon from '../../../images/font-awesome-svg/th-large.svg'

export class GridViewButton extends React.Component {
  render() {
    return (
      <IconButton
        {...this.props}
        icon={GridIcon}
      />
    )
  }
}