import React from 'react'
import {
  Animated,
  FlatList,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import { setSelectedStock } from '../../../store/stock/actions'
import Image from 'react-native-scalable-image'
import SmileWink from '../../../images/font-awesome-svg/smile-wink.svg'
import Style from './style'
import { StockCard } from '../../../components/stock/StockCard'
import { STOCK_INFO } from '../../../navigation/pointsNavigate'
import { getSVGColor } from '../../../helpers/color-helper'

class StocksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Акции',
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate = () => {
    if (this.props.selectedStock.Id > 0) {
      this.props.navigation.navigate(STOCK_INFO)
    }
  }

  onSelectedStock = stockId => {
    const stock = this.getStockById(stockId)

    this.props.setSelectedStock({})
    if (Object.keys(stock).length > 0) {
      this.props.setSelectedStock(stock)
    }
  }

  getStockById = id => {
    const stock = this.props.stocks.filter(p => p.Id == id)[0]

    return stock || {}
  }

  renderEmptyStock = () => {
    return (
      <Animated.View style={[
        Style.centerScreen,
        { opacity: this.state.showScaleAnimation },
        { transform: [{ scale: this.state.showScaleAnimation }] }]} >
        <SmileWink
          width={90}
          height={90}
          color={getSVGColor(this.props.style.theme.secondaryTextColor.color)}
        />
        <View style={Style.textInfo}>
          <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>Скоро появятся</Text>
          <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>новые акции!</Text>
        </View>

      </Animated.View>
    )
  }

  renderStocks = () => {
    return (
      <Animated.ScrollView
        style={[
          {
            flex: 1,
            paddingHorizontal: 12
          },
          { opacity: this.state.showScaleAnimation },
          { transform: [{ scale: this.state.showScaleAnimation }] }
        ]
        }>
        <FlatList
          data={this.props.stocks}
          keyExtractor={(item => item.Id.toString())}
          renderItem={({ item }) => {
            return (
              <StockCard
                id={item.Id}
                stockName={item.Name}
                imageSource={item.Image}
                onPress={this.onSelectedStock}
                style={this.props.style} />
            )
          }}
        />
      </Animated.ScrollView>
    )
  }

  render() {
    if (this.props.stocks.length > 0)
      return this.renderStocks()
    else
      return this.renderEmptyStock()
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.main.stocks,
    selectedStock: state.stock.selectedStock,
    serverDomain: state.appSetting.serverDomain,
    style: state.style
  }
}

export default connect(mapStateToProps, { setSelectedStock })(StocksScreen)