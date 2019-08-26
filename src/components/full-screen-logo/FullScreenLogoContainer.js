import React from 'react'
import { connect } from 'react-redux'
import { FullScreenLogo } from './FullScreenLogo'

class FullScreenLogoContainer extends React.Component {
  render() {
    return <FullScreenLogo src={this.props.logo} />
  }
}

const mapStateToProps = state => {
  return {
    logo: state.appSetting.logo
  }
}

export default connect(mapStateToProps)(FullScreenLogoContainer)