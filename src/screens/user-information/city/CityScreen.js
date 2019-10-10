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
  Platform
} from 'react-native'
import { setCityId, setBranchId, addOrUpdateUser, setIsLogin } from '../../../store/user/actions'
import { getMainData } from '../../../store/main/actions'
import Style from './style'
import { MAIN } from '../../../navigation/pointsNavigate'
import { SimpleListItem } from '../../../components/simple-list-item/SimpleListItem'
import CityIcon from '../../../images/font-awesome-svg/city.svg'
import { timingAnimation } from '../../../animation/timingAnimation'
import { getSVGColor } from '../../../helpers/color-helper'
import LottieView from 'lottie-react-native';

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
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
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
      userName: this.props.userName,
      phoneNumber: this.props.phoneNumber
    }

    this.setState({
      onFinishedButton: true
    },
      () => this.props.addOrUpdateUser(userData))
  }

  nextPage = () => {
    this.props.navigation.navigate(MAIN)
  }

  componentDidUpdate() {
    if (this.props.clientId > 0 &&
      this.state.onFinishedButton) {
      this.props.setIsLogin(true)
      this.props.getMainData(this.props.branchId)
      this.setState({ onFinishedButton: false, nextPage: true })
    } else if (this.props.categories.length > 0 && this.state.nextPage) {
      this.nextPage()
    }
  }

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
            {/* <CityIcon
              width={130}
              height={130}
              color={getSVGColor(this.props.style.theme.secondaryTextColor.color)} /> */}
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
          </ScrollView>
        </View>
        <View style={[Style.inputSize, Style.footerContainer, Style.pv_20]}>
          <Button
            title='Далее'
            onPress={this.onFinishSetUserData}
            disabled={this.props.cityId == -1}
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
    if (this.props.isFetchingMainData || this.props.isFetchingLogin)
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
    isFetchingLogin: state.user.isFetching,
    clientId: state.user.clientId,
    userName: state.user.userName,
    phoneNumber: state.user.phoneNumber,
    categories: state.main.categories,
    style: state.style
  }
}

const mapDispatchToProps = {
  setIsLogin,
  setCityId,
  setBranchId,
  getMainData,
  addOrUpdateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CityScreen)

