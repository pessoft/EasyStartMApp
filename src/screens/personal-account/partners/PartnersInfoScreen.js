import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator, View } from 'react-native'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { SimpleTextBlock } from '../../../components/big-header-content-block/SimpleTextBlock';
import { getPartnersTransaction } from '../../../store/promotion-transaction/actions'

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

  componentDidMount = () => {
    timingAnimation(this.state.showAnimationLoader, 1, 300, true)
    this.props.getPartnersTransaction(this.props.clientId)
  }

  componentDidUpdate = () => {
    if (!this.props.isFetching)
      timingAnimation(this.state.showAnimation, 1, 300, true)
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

  renderContent = () => {
    return (
      <Animated.ScrollView
        style={[
          Style.container,
          {
            opacity: this.state.showAnimation,
            transform: [{ scale: this.state.showAnimation }]
          }
        ]}>
        <SimpleTextBlock
          style={this.props.style}
          mainText={this.props.referralCode}
          secondText={this.secondText}
        />
        {
          (!this.props.partnerTransactions ||
            this.props.partnerTransactions.length == 0) &&
          this.renderEmpty()
        }
        {/* <FlatList
          data={this.props.history.reverse()}
          keyExtractor={item => item.Id.toString()}
          renderItem={({ item }) => <MenuItemWithoutImage
            style={this.props.style}
            id={item.Id}
            headerText={this.getHeaderText(item.Id)}
            text={this.getText(item.Date, item.AmountPay)}
            onPress={this.onSelectOrderId}
          />}
        /> */}
      </Animated.ScrollView>
    )
  }

  renderEmpty = () => {
    return (
      <View style={[Style.centerScreen, , Style.emptyContainer]}>
        <LottieView
          style={Style.loader}
          source={require('../../../animation/src/search-empty.json')}
          autoPlay
          resizeMode='cover'
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
    partnerTransactions: state.promotionTransaction.partnerTransactions
  }
}

const mapDispatchToProps = {
  getPartnersTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnersInfoScreen)