import React from 'react'
import { Animated, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import Style from './style'


class StocksInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('StockName', 'Акция'),
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({ StockName: this.props.selectedStock.Name })
    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedStock != prevProps.selectedStock) {
      this.props.navigation.setParams({ StockName: this.props.selectedStock.Name })
    }
  }

  render() {
    return (
      <Animated.ScrollView
        contentContainerStyle={{ paddingHorizontal: 12 }}
        style={[{
          opacity: this.state.showScaleAnimation,
          transform: [{ scale: this.state.showScaleAnimation }]
        }]}>
        <Image
          style={Style.image}
          source={this.props.selectedStock.Image}
        />
        <Text style={[
          this.props.style.theme.backdoor,
          this.props.style.theme.primaryTextColor,
          Style.stockDescription,
          this.props.style.theme.shadowColor,
        ]}
        >
          {this.props.selectedStock.Description}
        </Text>
      </Animated.ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedStock: state.stock.selectedStock,
    serverDomain: state.appSetting.serverDomain,
    style: state.style
  }
}

export default connect(mapStateToProps)(StocksInfoScreen)