import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Animated,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { Contacts } from '../../../components/checkout/contacts/Contacts'
import { DeliveryType } from '../../../components/checkout/delivery-type/DeliveryType'
import { PaymentType } from '../../../components/checkout/payment-type/PaymentType'
import { TypeDelivery } from '../../../helpers/type-delivery'
import { TypePayment } from '../../../helpers/type-payment'
import { DeliveryAddressAnimation } from '../../../components/checkout/delivery-address/DeliveryAddressAnimation'
import { OrderComment } from '../../../components/checkout/order-comment/OrderComment'

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
      paymentType: TypePayment.Cash,
      deliveryAddress: {
        cityId: this.props.userData.cityId,
        deliveryArea: '',
        street: '',
        houseNumber: '',
        entrance: '',
        apartmentNumber: '',
        level: '',
        intercomCode: ''
      },
      commentText: ''
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  setContactsData = userData => this.setState({ userData })
  changeDeliveryType = deliveryType => this.setState({ deliveryType })
  changePaymentType = paymentType => this.setState({ paymentType })
  setDeliveryAddress = deliveryAddress => this.setState({ deliveryAddress })
  setCommentText = commentText => this.setState({ commentText })

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
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          behavior='padding'
          enabled>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="always">
            <Contacts
              changeContacts={this.setContactsData}
              style={this.props.style}
              userName={this.props.userData.userName}
              phoneNumber={this.props.userData.phoneNumber}
            />
            <PaymentType
              style={this.props.style}
              initValue={this.state.paymentType}
              changeDeliveryType={this.changePaymentType}
            />
            <DeliveryType
              style={this.props.style}
              initValue={this.state.deliveryType}
              changeDeliveryType={this.changeDeliveryType}
            />
            <DeliveryAddressAnimation
              cityId={this.state.deliveryAddress.cityId}
              style={this.props.style}
              changeDeliveryAddress={this.setDeliveryAddress}
              isShow={this.state.deliveryType == TypeDelivery.Delivery}
            />
            <OrderComment
              style={this.props.style}
              changeCommentText={this.setCommentText}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
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