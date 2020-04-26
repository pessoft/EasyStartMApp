import React from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import Style from './style'
import { MenuItem } from '../../../components/menu-item/MenuItem'
import HistoryIcon from '../../../images/font-awesome-svg/history.svg'
import PartnersIcon from '../../../images/font-awesome-svg/users-medical.svg'
import BonusIcon from '../../../images/font-awesome-svg/gift.svg'
import UserInfoIcon from '../../../images/font-awesome-svg/address-card.svg'
import PalletIcon from '../../../images/font-awesome-svg/palette.svg'
import LogoutIcon from '../../../images/font-awesome-svg/sign-out-alt.svg'
import LoginIcon from '../../../images/font-awesome-svg/sign-in-alt.svg'
import { logout } from '../../../store/user/actions'

import {
  USER_INFO,
  ORDER_HISTORY_PROFILE,
  COLOR_THEME_PROFILE,
  PARTNERS_PROFILE,
  CASHBACK_PROFILE,
  AUTH_LOGIN
}
  from '../../../navigation/pointsNavigate'
import { BarsButton } from '../../../components/buttons/Square/BarsButton'
import BasketIcoWithBadge from '../../../components/badges/basket-badge/BasketIcoWithBadge'

class PersonalAccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const style = navigation.getParam('style', null)

    return {
      headerTitle: 'Личный кабинет',
      headerTitleStyle: {
        textAlign: Platform.OS == 'ios' ? 'center' : 'left',
        flex: 1,
      },
      headerRight: () => <BasketIcoWithBadge
        containerStyle={{ paddingHorizontal: 25 }}
        navigation={navigation}
        width={28}
        height={28}
        animation={true} />,
      headerLeft: () => <BarsButton
        containerStyle={{ paddingHorizontal: 20 }}
        disabled={false}
        onPress={() => navigation.openDrawer()}
        size={25}
        nonBorder={true}
        color={style ? style.theme.textPrimaryColor.color : '#fff'} />
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({
      style: this.props.style,
    })

    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  logout = () => {
    this.props.logout()
    this.goToAuthLoginPage()
  }

  goToAuthLoginPage = () => this.props.navigation.navigate(AUTH_LOGIN)

  render() {
    return (
      <Animated.ScrollView
        style={[
          {
            paddingHorizontal: 12,
            opacity: this.state.showScaleAnimation,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}
      >
        {
          this.props.isLogin &&
          <MenuItem
            style={this.props.style}
            icon={HistoryIcon}
            text={'История заказов'}
            onPress={() => this.props.navigation.navigate(ORDER_HISTORY_PROFILE)}
          />
        }

        {
          this.props.isLogin &&
          this.props.promotionPartnersSetting.IsUsePartners &&
          <MenuItem
            style={this.props.style}
            icon={PartnersIcon}
            text={'Партнерская программа'}
            onPress={() => this.props.navigation.navigate(PARTNERS_PROFILE)}
          />
        }
        {
          this.props.isLogin &&
          this.props.promotionCashbackSetting.IsUseCashback &&
          <MenuItem
            style={this.props.style}
            icon={BonusIcon}
            text={'Кешбек'}
            onPress={() => this.props.navigation.navigate(CASHBACK_PROFILE)}
          />
        }
        {
          this.props.isLogin &&
          <MenuItem
            style={this.props.style}
            icon={UserInfoIcon}
            text={'Изменить мои данные'}
            onPress={() => this.props.navigation.navigate(USER_INFO)}
          />
        }
        <MenuItem
          style={this.props.style}
          icon={PalletIcon}
          text={'Внешний вид'}
          onPress={() => this.props.navigation.navigate(COLOR_THEME_PROFILE)}
        />
        {
          this.props.isLogin &&
          <MenuItem
            style={this.props.style}
            icon={LogoutIcon}
            text={'Выйти из аккаунта'}
            onPress={this.logout}
          />
        }
        {
          !this.props.isLogin &&
          <MenuItem
            style={this.props.style}
            icon={LoginIcon}
            text={'Войти'}
            onPress={this.goToAuthLoginPage}
          />
        }
      </Animated.ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    isLogin: state.user.isLogin,
    promotionPartnersSetting: state.main.promotionPartnersSetting,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
  }
}

export default connect(mapStateToProps, { logout })(PersonalAccountScreen)