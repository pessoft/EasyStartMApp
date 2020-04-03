import React from 'react'
import { connect } from 'react-redux'
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Picker,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

import {
  Currency,
  Order,
  Receipt,
  Failure,
  Cloudipsp,
  CardInput,
  CardLayout,
  CloudipspWebView
} from 'react-native-cloudipsp'

import {
  CardFieldNumber,
  CardFieldExpMm,
  CardFieldExpYy,
  CardFieldCvv
} from '../../../components/card-field-override'
import Style from './style'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { showMessage } from 'react-native-flash-message'

class CheckoutOnlinePay extends React.Component {
  static navigationOptions = {
    headerTitle: 'Онлайн оплата',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      merchant: '1441352',
      amount: '10000',
      ccy: 'RUB',
      email: 'maxell-07@mail.ru',
      description: 'test payment :)',
      mode: 'flexible',
    }
  }

  cloudipsp = () => {
    return new Cloudipsp(Number(this.state.merchant), (payConfirmator) => {
      this.setState({ webView: 1 })
      return payConfirmator(this.cloudipspWebView)
    })
  }

  showErrMessage = message => {
    showMessage({
      message: message,
      type: 'danger',
      duration: 50000
    })
  }

  getOrder = () => {
    return new Order(
      Number(this.state.amount),
      this.state.ccy,
      'es3',
      this.state.description,
      this.state.email
    );
  };

  pay = () => {
    const order = this.getOrder()
    const card = this.cardForm.getCard()
    if (!card.isValidCardNumber()) {
      this.showErrMessage('Некорректный номер карты')
    } else if (!card.isValidExpireMonth() ||
      !card.isValidExpireYear() ||
      !card.isValidExpireDate()) {
      this.showErrMessage('Cрок действия карты недействителен')
    } else if (!card.isValidCvv()) {
      this.showErrMessage('CVV не действителен')
    } else {
      const cloudipsp = this.cloudipsp()
      cloudipsp.pay(card, order)
        .then((receipt) => {
          this.setState({ webView: undefined })
          let s = ""
          for(const key in receipt) {
            s += `${key}:${receipt[key]}; `
          }
          alert(s)
          this.showErrMessage(`Transaction Completed; Result: ${receipt.status} PaymentId: ${receipt.paymentId}`)
          console.log('Receipt: ', receipt)
        })
        .catch((error) => {
          this.showErrMessage(error.message)
        })
    }
  }

  renderScreen() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <KeyboardAvoidingView style={Style.screen} behavior='padding'>
          <View
            style={Style.body}>
            <Text style={[
              this.props.style.fontSize.h6,
              this.props.style.theme.primaryTextColor,
              Style.amountLabel
            ]}>
              Сумма к оплате: {this.state.amount} {this.props.currencyPrefix}
            </Text>
            <View style={Style.cardFrom}>
              {this.renderCardForm()}
            </View>
            <View style={Style.payButtonContainer}>
              <View style={Style.payButtonWrap}>
                <SimpleTextButton
                  text='Оплатить'
                  onPress={this.pay}
                  sizeText={this.props.style.fontSize.h6.fontSize}
                  color={this.props.style.theme.accentOther.backgroundColor}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  renderCardForm() {
    return (
      <CardLayout
        containerStyle={{ flex: 1 }}
        ref={(ref) => {
          this.cardForm = ref
        }}
        inputNumber={() => this.refs.inputNumber}
        inputExpMm={() => this.refs.inputMm}
        inputExpYy={() => this.refs.inputYy}
        inputCvv={() => this.refs.inputCvv}
      >
        <CardFieldNumber
          placeholder='Номер карты'
          ref='inputNumber'
          placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
          style={[
            Style.cardNumber,
            this.props.style.fontSize.h8,
            this.props.style.theme.primaryTextColor,
            this.props.style.theme.dividerColor,
          ]}
          onSubmitEditing={() => {
            this.refs.inputCvv.focus()
          }}
        />
        <CardFieldCvv
          placeholder='CVV код'
          ref='inputCvv'
          placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
          style={[
            Style.cvv,
            this.props.style.fontSize.h8,
            this.props.style.theme.primaryTextColor,
            this.props.style.theme.dividerColor
          ]}
          onSubmitEditing={() => {
            this.refs.inputMm.focus()
          }}
        />
        <View style={Style.cardExpiryDate}>
          <CardFieldExpMm
            ref='inputMm'
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.month,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor
            ]}
            placeholder='MM'
            onSubmitEditing={() => {
              this.refs.inputYy.focus()
            }}
          />
          <CardFieldExpYy
            ref='inputYy'
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.year,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor
            ]}
            placeholder='YY'
            onSubmitEditing={() => {
              if (this.props.onCompletion) {
                this.props.onCompletion(this)
              }
            }}
          />
        </View>
      </CardLayout>)
  }

  render() {
    return <View style={Style.screen}>
      {this.state.webView === undefined
        ? this.renderScreen()
        : <CloudipspWebView
          ref={(ref) => {
            this.cloudipspWebView = ref
          }}
          decelerationRate='normal'
          onError={(error) => {
            console.log('webViewError:' + JSON.stringify(error))
          }}
          style={{ flex: 1 }}
        />
      }
    </View>
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    currencyPrefix: state.appSetting.currencyPrefix,
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOnlinePay)