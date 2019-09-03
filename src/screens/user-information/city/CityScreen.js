import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, FlatList, View, Button, ActivityIndicator } from 'react-native'
import { setCityId, setBranchId } from '../../../store/user/actions'
import { getMainData } from '../../../store/main/actions'
import Styles from './style'
import { MAIN } from '../../../navigation/pointsNavigate'
import { SimpleListItem } from '../../../components/simple-list-item/SimpleListItem'
import CityIco from '../../../images/font-awesome-svg/city.svg'

class CityScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Выберите ваш город',
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
    if (this.props.categories.length > 0)
      this.props.navigation.navigate(MAIN)
  }

  renderScreen = () => {
    return (
      <View style={Styles.bodyContainer}>
        <View style={Styles.contentContainer}>
          <View style={Styles.cityIco}>
            <CityIco
              width={130}
              height={130}
              color={this.props.style.theme.secondaryTextColor.color} />
          </View>
          <ScrollView>
            <FlatList
              data={this.citiesToArray()}
              renderItem={({ item }) => <SimpleListItem
                style={this.props.style}
                nonBorder={item.nonBorder}
                id={item.key}
                text={item.city}
                selected={this.props.cityId == item.key}
                onPress={this.setCityId} />}
            />
          </ScrollView >
        </View>
        <View style={[Styles.inputSize, Styles.footerContainer, Styles.pv_20]}>
          <Button
            title='Далее'
            onPress={this.onNextPage}
            disabled={this.props.cityId == -1}
            color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
        </View >
      </View >
    )
  }

  renderLoader() {
    return (
      <View style={Styles.centerScreen}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
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
    isFetching: state.main.isFetching,
    categories: state.main.categories,
    style: state.style
  }
}

const mapDispatchToProps = {
  setCityId,
  setBranchId,
  getMainData
}

export default connect(mapStateToProps, mapDispatchToProps)(CityScreen)

