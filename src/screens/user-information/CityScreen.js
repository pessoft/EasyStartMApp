import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, FlatList, View, Button, ActivityIndicator } from 'react-native'
import { setCityId, setBranchId } from '../../store/user/actions'
import { getMainData } from '../../store/main/actions'
import Styles from './cityScreenStyle'
import { MAIN } from '../../navigation/pointsNavigate'
import { SimpleListItem } from '../../components/simple-list-item/SimpleListItem'

class CityScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Выберите ваш город',
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  }

  citiesToArray = () => {
    return Object.keys(this.props.cities).map(p => ({ key: p, city: this.props.cities[p] }))
  }

  setCityId = (cityId) => {
    this.props.setCityId(cityId)
    this.props.setBranchId(this.props.cityBranches[cityId])
  }

  onNextPage = () => {
    this.props.getMainData(this.props.branchId)
  }

  componentDidUpdate() {
    if (this.props.mainDataLoaded)
      this.props.navigation.navigate(MAIN)
  }

  renderScreen = () => {
    return (
      <View style={Styles.bodyContainer}>
        <View style={Styles.contentContainer}>
          <ScrollView >
            <FlatList
              style={Styles.ph_10}
              data={this.citiesToArray()}
              renderItem={({ item }) => <SimpleListItem
                id={item.key}
                text={item.city}
                selected={this.props.cityId == item.key}
                onPress={this.setCityId} />}
            />
          </ScrollView >
        </View>
        <View style={[Styles.inputNormalSize, Styles.footerContainer, Styles.pv_20]}>
          <Button title='Далее' onPress={this.onNextPage} disabled={this.props.cityId == -1} />
        </View >
      </View >
    )
  }

  renderLoader() {
    return (
      <View style={Styles.centerScreen}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  render() {
    if (this.props.isFetching)
      return this.renderLoader()
    else
      return this.renderScreen()
  }
}

const mapStateToProps = state => {
  return {
    cities: state.location.cities,
    cityBranches: state.location.cityBranches,
    cityId: state.user.cityId,
    branchId: state.user.branchId,
    mainDataLoaded: state.main.dataLoaded,
    isFetching: state.main.isFetching
  }
}

const mapDispatchToProps = {
  setCityId,
  setBranchId,
  getMainData
}

export default connect(mapStateToProps, mapDispatchToProps)(CityScreen)

