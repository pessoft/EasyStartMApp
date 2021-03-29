import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator, View } from 'react-native'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { PartnersHeaderBlock } from '../../../components/big-header-content-block/partners-header-block/PartnersHeaderBlock';
import { getPartnersTransaction } from '../../../store/promotion-transaction/actions'
import { priceValid, dateFormatted } from '../../../helpers/utils'
import { TransactionItem } from '../../../components/transaction-item/TransactionItem'
import { PromotionTransactionType } from '../../../logic/promotion/promotion-transaction-type';
import { updatePerentReferral, dropFetchFlag } from '../../../store/user/actions'
import { showMessage } from "react-native-flash-message"

class PartnersInfoScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Партнерская программа',
  }

  constructor(props) {
    super(props)
    this.secondText = 'Ваш реферальный код'
    this.state = {
      showAnimation: new Animated.Value(0),
      showAnimationLoader: new Animated.Value(0),
    }
  }

  showErrMessage = () => {
    if (!this.props.isFetchingReferalCodeError)
      return

    showMessage({
      message: this.props.errorMessageReferalCode,
      type: 'danger',
    });
    this.props.dropFetchFlag()
  }

  successSetParentReferral = () => {
    showMessage({
      message: 'Реферальный код успешно установлен',
      type: 'success',
    });
  }

  componentDidMount = () => {
    timingAnimation(this.state.showAnimationLoader, 1, 300, true)
    this.props.getPartnersTransaction(this.props.clientId)
  }

  componentDidUpdate = (prevProps) => {
    if (!this.props.isFetching)
      timingAnimation(this.state.showAnimation, 1, 300, true)

    if (prevProps.parentReferralClientId <= 0 &&
      this.props.parentReferralClientId > 0)
      this.successSetParentReferral()

    if (this.props.isFetchingReferalCodeError &&
      !this.props.isFetchingReferalCode)
      this.showErrMessage()
  }

  renderLoader = () => {
    return (
      <Animated.View
        style={[
          Style.centerScreen,
          {
            opacity: this.state.showAnimationLoader,
            transform: [{ scale: this.state.showAnimationLoader }]
          }
        ]}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </Animated.View>
    )
  }

  renderContentAdditionalBlock = () => {
    if (!this.props.partnerTransactions ||
      this.props.partnerTransactions.length == 0) {
      return this.renderEmpty()
    } else {
      return this.renderTransactions()
    }
  }

  renderTransaction = ({ item }) => {
    return <TransactionItem
      style={this.props.style}
      headerText={this.getHeaderText(item.ReferralPhone)}
      text={dateFormatted(item.Date)}
      money={priceValid(item.Money)}
      transactionType={PromotionTransactionType.Income}
    />
  }

  getHeaderText = referralPhone => {
    return `Реф. ${referralPhone}`
  }

  setParentReferral = code => {
    const data = {
      parentReferralCode: code,
      phoneNumber: this.props.user.phoneNumber,
      password: this.props.user.password,
    }

    this.props.updatePerentReferral(data)
  }

  renderTransactions = () => {
    return (
      <FlatList
        data={this.props.partnerTransactions}
        keyExtractor={item => item.Id.toString()}
        renderItem={this.renderTransaction}
        ListHeaderComponent={this.getHeader}
      />
    )
  }

  getHeader = () => {
    return  <PartnersHeaderBlock
    style={this.props.style}
    mainText={this.props.referralCode}
    secondText={this.secondText}
    parentReferralClientId={this.props.parentReferralClientId}
    isFetching={this.props.isFetchingReferalCode}
    setParentReferral={this.setParentReferral}
  />
  }
  renderContent = () => {
    return (
      <Animated.View
        keyboardShouldPersistTaps={'handle'}
        style={[
          Style.container,
          {
            paddingHorizontal: 12,
            opacity: this.state.showAnimation,
            transform: [{ scale: this.state.showAnimation }]
          }
        ]}>
        {this.renderContentAdditionalBlock()}
      </Animated.View>
    )
  }

renderEmpty = () => {
  return (
    <FlatList
      data={[{key: 'empty-partners-info'}]}
      renderItem={this.renderEmptyContent}
      ListHeaderComponent={this.getHeader}
    />
  )
}

  renderEmptyContent = ({item}) => {
    return (
      <View key={item.key} style={[Style.centerScreen, Style.emptyContainer]}>
        <LottieView
          style={Style.loader}
          source={require('../../../animation/src/search-empty.json')}
          autoPlay
          resizeMode='contain'
          autoSize={true}
          speed={1.5} />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            { marginTop: 20 }
          ]}
        >
          У вас пока нет рефералов
        </Text>
      </View>
    )
  }

  render() {
    if (this.props.isFetching)
      return this.renderLoader()

    return this.renderContent()
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    clientId: state.user.clientId,
    referralCode: state.user.referralCode,
    isFetching: state.promotionTransaction.isFetching,
    partnerTransactions: state.promotionTransaction.partnerTransactions,

    user: state.user,
    isFetchingReferalCode: state.user.isFetching,
    isFetchingReferalCodeError: state.user.isFetchError,
    errorMessageReferalCode: state.user.errorMessage,
    parentReferralCode: state.user.parentReferralCode,
    parentReferralClientId: state.user.parentReferralClientId
  }
}

const mapDispatchToProps = {
  getPartnersTransaction,
  updatePerentReferral,
  dropFetchFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnersInfoScreen)