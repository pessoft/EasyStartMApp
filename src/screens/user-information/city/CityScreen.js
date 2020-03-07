import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  FlatList,
  View,
  Button,
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform,
  Picker
} from 'react-native'
import { setCityId, setBranchId, updateUser, dropFetchFlag, dropSuccessClientUpdateDataFlag } from '../../../store/user/actions'
import { getMainData } from '../../../store/main/actions'
import Style from './style'
import { MAIN } from '../../../navigation/pointsNavigate'
import { SimpleListItem } from '../../../components/simple-list-item/SimpleListItem'
import { timingAnimation } from '../../../animation/timingAnimation'
import LottieView from 'lottie-react-native';
import { showMessage } from "react-native-flash-message"

const { width } = Dimensions.get('window')

class CityScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Выберите ваш город',
  }

  constructor(props) {
    super(props)

    this.state = {
      onFinishedButton: false,
      showScaleAnimation: new Animated.Value(0),
      nextPage: false
    }
  }

  componentDidMount() {
    this.props.dropSuccessClientUpdateDataFlag()
    this.props.setCityId(-1)
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }


  showErrMessage = () => {
    if (!this.props.isFetchUserError)
      return
    showMessage({
      message: this.props.errorMessage,
      type: "danger",
    });
    this.props.dropFetchFlag()
  }

  citiesToArray = () => {
    return Object.keys(this.props.cities).map(p => ({ key: p, city: this.props.cities[p] }))
  }

  setCityId = (cityId) => {
    this.props.setCityId(cityId)
    this.props.setBranchId(this.props.cityBranches[cityId])
  }

  onFinishSetUserData = () => {
    const userData = {
      id: this.props.clientId,
      phoneNumber: this.props.user.phoneNumber,
      password: this.props.user.password,
      cityId: this.props.user.cityId,
      branchId: this.props.user.branchId,
      email: this.props.user.email,
      userName: this.props.user.userName,
      dateBirth: this.props.user.dateBirth,
      parentReferralClientId: this.props.user.parentReferralClientId,
      parentReferralCode: this.props.user.parentReferralCode,
    }

    this.setState({
      onFinishedButton: true
    },
      () => this.props.updateUser(userData))
  }

  nextPage = () => {
    this.props.navigation.navigate(MAIN)
  }

  getParamsForMainData = () => {
    return {
      branchId: this.props.branchId,
      clientId: this.props.clientId
    }
  }

  componentDidUpdate() {
    if (this.props.isFetchUserError) {
      this.showErrMessage()
      this.setState({ onFinishedButton: false, nextPage: false })
      timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    } else if (this.props.clientId > 0 &&
      this.state.onFinishedButton) {
      const params = this.getParamsForMainData()
      this.props.getMainData(params)

      this.setState({ onFinishedButton: false, nextPage: true })
    } else if (this.props.cityId > 0
      && this.props.categories.length > 0
      && this.state.nextPage
      && this.props.isSuccessClientUpdateData) {
      this.nextPage()
    }
  }

  renderCitiesIOS = () => {
    let citiesReal = this.citiesToArray()
    let cities = [{ key: -1, city: 'Выберите город' }, ...citiesReal]
    return (
      <Picker
        selectedValue={this.props.cityId}
        style={[
          this.props.style.theme.secondaryTextColor,
          this.props.style.fontSize.h6,
        ]}
        itemStyle={[
          this.props.style.theme.secondaryTextColor,
          this.props.style.fontSize.h6,
        ]}
        onValueChange={(this.setCityId)
        }>
        {
          cities.map(p => <Picker.Item key={p.key.toString()} label={p.city} value={p.key} />)
        }
      </Picker>
    )
  }

  renderCitiesAndroid = () => {
    return (
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
      </ScrollView>
    )
  }

  renderCities = () => Platform.OS == 'ios' ? this.renderCitiesIOS() : this.renderCitiesAndroid()

  renderScreen = () => {
    return (
      <Animated.View style={[
        Style.bodyContainer,
        { transform: [{ scale: this.state.showScaleAnimation }] }]}>
        <View style={Style.contentContainer}>
          <View style={Style.cityIcon}>
            <LottieView
              style={Style.loader}
              source={require('../../../animation/src/city.json')}
              autoPlay
              resizeMode='cover'
              autoSize={true}
              speed={1} />
          </View>
          {this.renderCities()}
        </View>
        <View style={[Style.inputSize, Style.footerContainer, Style.pv_20]}>
          <Button
            title='Далее'
            onPress={this.onFinishSetUserData}
            disabled={this.props.cityId < 1}
            color={Platform.OS == 'ios' ?
              this.props.style.theme.primaryTextColor.color :
              this.props.style.theme.defaultPrimaryColor.backgroundColor} />
        </View>
      </Animated.View>
    )
  }

  renderLoader() {
    return (
      <View style={Style.centerScreen}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </View>
    )
  }

  render() {
    if (this.props.isFetchingMainData || this.props.isFetchingUser)
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
    isFetchingMainData: state.main.isFetching,
    isFetchingUser: state.user.isFetching,
    isFetchUserError: state.user.isFetchError,
    errorMessage: state.user.errorMessage,
    clientId: state.user.clientId,
    userName: state.user.userName,
    phoneNumber: state.user.phoneNumber,
    parentReferralClientId: state.user.parentReferralClientId,
    parentReferralCode: state.user.parentReferralCode,
    categories: state.main.categories,
    user: state.user,
    style: state.style,
    isSuccessClientUpdateData: state.user.isSuccessClientUpdateData,
  }
}

const mapDispatchToProps = {
  setCityId,
  setBranchId,
  getMainData,
  updateUser,
  dropFetchFlag,
  dropSuccessClientUpdateDataFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(CityScreen)

