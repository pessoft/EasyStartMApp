import React from 'react'
import { Animated, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import { StockCard } from '../../../components/stock/StockCard'
import Image from 'react-native-scalable-image'
import Styles from './style'

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

  getImageSource() {
    return { uri: `${this.props.serverDomain}${this.props.selectedStock.Image}` }
  }

  render() {
    return (
      <Animated.ScrollView
        style={[{ transform: [{ scale: this.state.showScaleAnimation }] }]}>
        <Image
          source={this.getImageSource()}
          width={Dimensions.get('window').width}
          resizeMode='contain' />
        <Text style={[
          this.props.style.theme.defaultPrimaryColor,
          this.props.style.theme.textPrimaryColor,
          Styles.stockDescription]}
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