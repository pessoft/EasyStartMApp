import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  ScrollView,
  Button,
  View,
  Text,
  Animated,
  Platform
} from 'react-native'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { Contacts } from '../../../components/checkout/contacts/Contacts'
import { DeliveryType } from '../../../components/checkout/delivery-type/DeliveryType'
import { PaymentType } from '../../../components/checkout/payment-type/PaymentType'
import { TypeDelivery } from '../../../helpers/type-delivery'
import { TypePayment } from '../../../helpers/type-payment'

class CheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Оформление заказа',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      userData: {
        userName: props.userData.userName,
        phoneNumber: props.userData.phoneNumber
      },
      deliveryType: TypeDelivery.Delivery,
      paymentType: TypePayment.Cash
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  setContactsData = contacts => {
    this.setState({
      userData: {
        userName: contacts.userName,
        phoneNumber: contacts.phoneNumber
      }
    })
  }

  changeDeliveryType = deliveryType => this.setState({ deliveryType })
  changePaymentType = paymentType => this.setState({ paymentType })

  render() {
    return (
      <Animated.View
        style={[
          {
            marginTop: 5,
            opacity: this.state.showScaleAnimation,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        <ScrollView>
          <Contacts
            changeContacts={this.setContactsData}
            style={this.props.style}
            userName={this.props.userData.userName}
            phoneNumber={this.props.userData.phoneNumber}
          />
          <DeliveryType
            style={this.props.style}
            initValue={this.state.deliveryType}
            changeDeliveryType={this.changeDeliveryType}
          />
          <PaymentType
            style={this.props.style}
            initValue={this.state.paymentType}
            changeDeliveryType={this.changePaymentType}
          />
        </ScrollView>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    userData: state.user
  }
}

export default connect(mapStateToProps)(CheckoutScreen)