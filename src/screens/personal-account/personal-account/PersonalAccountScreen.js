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
import PalleteIcon from '../../../images/font-awesome-svg/palette.svg'

import { USER_INFO, ORDER_HISTORY_PROFILE, COLOR_THEME_PROFILE } from '../../../navigation/pointsNavigate'

class PersonalAccountScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Личный кабинет',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  render() {
    return (
      <Animated.ScrollView
        style={[
          {
            opacity: this.state.showScaleAnimation,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}
      >
        <MenuItem
          style={this.props.style}
          icon={HistoryIcon}
          text={'История заказов'}
          onPress={() => this.props.navigation.navigate(ORDER_HISTORY_PROFILE)}
        />
        {
          this.props.promotionPartnersSetting.IsUsePartners &&
          <MenuItem
            style={this.props.style}
            icon={PartnersIcon}
            text={'Партнерская программа'}
          />
        }
        {
          this.props.promotionCashbackSetting.IsUseCashback &&
          <MenuItem
            style={this.props.style}
            icon={BonusIcon}
            text={'Кешбек'}
          />
        }
        <MenuItem
          style={this.props.style}
          icon={UserInfoIcon}
          text={'Изменить мои данные'}
          onPress={() => this.props.navigation.navigate(USER_INFO)}
        />
        <MenuItem
          style={this.props.style}
          icon={PalleteIcon}
          text={'Внешний вид'}
          onPress={() => this.props.navigation.navigate(COLOR_THEME_PROFILE)}
        />
      </Animated.ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    promotionPartnersSetting: state.main.promotionPartnersSetting,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
  }
}

export default connect(mapStateToProps)(PersonalAccountScreen)