import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Animated,
} from 'react-native'
import { timingAnimation } from '../../animation/timingAnimation'
import { AddressInfo } from '../../components/information/address/AddressInfo'
import { PhoneNumberInfo } from '../../components/information/phone-number/PhoneNumberInfo'
import { WorkTimeInfo } from '../../components/information/work-time/WorkTimeInfo'
import { getWorkTime } from '../../helpers/work-time'
import { DeliveryPriceInfo } from '../../components/information/delivery-price/DeliveryPriceInfo'
import { DeliveryTypeInfo } from '../../components/information/delivery-type/DeliveryTypeInfo'
import { PaymentTypeInfo } from '../../components/information/payment-type/PaymentTypeInfo'
import { SocialInfo } from '../../components/information/social/SocialInfo'
import { socialType, getSocialData } from '../../helpers/social'

class CheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Информация',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  getAreaDelivery = () => {
    let areaDeliveries = []

    for (let index in this.props.deliverySettings.AreaDeliveries) {
      const area = this.props.deliverySettings.AreaDeliveries[index]

      if (areaDeliveries[area.MinPrice])
        areaDeliveries[area.MinPrice].push(area.NameArea)
      else
        areaDeliveries[area.MinPrice] = [area.NameArea]
    }

    areaDeliveries = areaDeliveries.map((areas, price) => `${areas.join(", ")}: ${price} ${this.props.currencyPrefix}`)
    return areaDeliveries
  }

  getAreaDeliveryPrice = () => {
    let areaDeliveries = []

    for (let index in this.props.deliverySettings.AreaDeliveries) {
      const area = this.props.deliverySettings.AreaDeliveries[index]

      if (areaDeliveries[area.DeliveryPrice])
        areaDeliveries[area.DeliveryPrice].push(area.NameArea)
      else
        areaDeliveries[area.DeliveryPrice] = [area.NameArea]
    }

    areaDeliveries = areaDeliveries.map((areas, price) => `${areas.join(", ")}: ${price} ${this.props.currencyPrefix}`)
    return areaDeliveries
  }

  render() {
    return (
      <Animated.View
        style={[
          {
            opacity: this.state.showScaleAnimation,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          <AddressInfo
            style={this.props.style}
            city={this.props.organizationSettings.City}
            street={this.props.organizationSettings.Street}
            homeNumber={this.props.organizationSettings.HomeNumber} />
          <PhoneNumberInfo
            style={this.props.style}
            phoneNumberMain={this.props.organizationSettings.PhoneNumber}
            phoneNumberSecond={this.props.organizationSettings.PhoneNumberAdditional} />
          <WorkTimeInfo
            style={this.props.style}
            data={getWorkTime(this.props.deliverySettings.TimeDelivery)}
          />
          <DeliveryPriceInfo
            style={this.props.style}
            currencyPrefix={this.props.currencyPrefix}
            areaDeliveriesPrice={this.getAreaDeliveryPrice()}
            areaDeliveries={this.getAreaDelivery()}
          />
          <DeliveryTypeInfo
            style={this.props.style}
            takeYourSelf={this.props.deliverySettings.IsTakeYourSelf}
            delivery={this.props.deliverySettings.IsDelivery}
          />
          <PaymentTypeInfo
            style={this.props.style}
            card={this.props.deliverySettings.PayCard}
            cash={this.props.deliverySettings.PayCash} />
          {
            this.props.organizationSettings.Email &&
            <SocialInfo
              style={this.props.style}
              social={getSocialData(socialType.email)}
              href={this.props.organizationSettings.Email}
            />
          }
          {
            this.props.organizationSettings.Vkontakte &&
            <SocialInfo
              style={this.props.style}
              social={getSocialData(socialType.vkontakte)}
              href={this.props.organizationSettings.Vkontakte}
            />
          }
          {
            this.props.organizationSettings.Instagram &&
            <SocialInfo
              style={this.props.style}
              social={getSocialData(socialType.instagram)}
              href={this.props.organizationSettings.Instagram}
            />
          }
          {
            this.props.organizationSettings.Facebook &&
            <SocialInfo
              style={this.props.style}
              social={getSocialData(socialType.facebook)}
              href={this.props.organizationSettings.Facebook}
            />
          }
        </ScrollView>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    organizationSettings: state.main.organizationSettings,
    deliverySettings: state.main.deliverySettings,
    currencyPrefix: state.appSetting.currencyPrefix
  }
}

export default connect(mapStateToProps)(CheckoutScreen)