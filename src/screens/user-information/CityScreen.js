import React from 'react'
import { connect } from 'react-redux'
import { USER_SET_INFO, MAIN } from '../../navigation/pointsNavigate'

class CityScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Выберите ваш город',
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  }

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.user.phoneNumber,
    cityId: state.user.cityId,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    locationLoaded: state.location.dataLoaded,
    mainDataLoaded: state.main.dataLoaded,
  }
}

export default connect(mapStateToProps, null)(CityScreen)

