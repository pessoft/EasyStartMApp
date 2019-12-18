import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator } from 'react-native'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { MainTextBlock } from '../../../components/main-text-block/MainTextBlock';

class PartnersInfoScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Партнерская программа',
  }

  constructor(props) {
    super(props)

    this.state = {
      showAnimation: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showAnimation, 1, 300, true)
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
            opacity: this.state.showLoaderScaleAnimation,
            transform: [{ scale: this.state.showLoaderScaleAnimation }]
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
          <MainTextBlock
          style={this.props.style}
          />
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
      <React.Fragment>
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
          История заказов пуста
        </Text>
      </React.Fragment>
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
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnersInfoScreen)