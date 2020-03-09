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
import { setSelectedNews } from '../../../store/news/actions'
import Image from 'react-native-scalable-image'
import SmileWink from '../../../images/font-awesome-svg/smile-wink.svg'
import Style from './style'
import { StockCard } from '../../../components/stock/StockCard'
import { STOCK_INFO, NEWS_INFO } from '../../../navigation/pointsNavigate'
import { getSVGColor } from '../../../helpers/color-helper'

class StocksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Новости',
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
    } else if (this.props.selectedNews.Id > 0) {
      this.props.navigation.navigate(NEWS_INFO)
    }
  }

  onSelectedStock = stockId => {
    const stock = this.getStockById(stockId)

    this.props.setSelectedNews({})
    this.props.setSelectedStock({})

    if (Object.keys(stock).length > 0) {
      this.props.setSelectedStock(stock)
    }
  }

  onSelectedNews = newsId => {
    const news = this.getNewsById(newsId)

    this.props.setSelectedStock({})
    this.props.setSelectedNews({})

    if (Object.keys(news).length > 0) {
      this.props.setSelectedNews(news)
    }
  }

  getStockById = id => {
    const stock = this.props.stocks.filter(p => p.Id == id)[0]

    return stock || {}
  }

  getNewsById = id => {
    const news = this.props.news.filter(p => p.Id == id)[0]

    return news || {}
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
          <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>У нас</Text>
          <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>нет новостей</Text>
        </View>

      </Animated.View>
    )
  }

  getData = () => {
    let items = []

    if(this.props.stocks.length > 0) {
      this.props.stocks.forEach(p => {
        items.push({
          id: p.Id,
          name: p.Name,
          description: p.Description,
          image: p.Image,
          onPress: this.onSelectedStock
        })
      })
    }

    if(this.props.news.length > 0) {
      this.props.news.forEach(p => {
        items.push({
          id: p.Id,
          name: p.Title,
          description: p.Description,
          image: p.Image,
          onPress: this.onSelectedNews
        })
      })
    }

    return items
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
          data={this.getData()}
          keyExtractor={(item => item.id.toString())}
          renderItem={({ item }) => {
            return (
              <StockCard
                id={item.id}
                stockName={item.name}
                imageSource={item.image}
                onPress={item.onPress}
                style={this.props.style} />
            )
          }}
        />
      </Animated.ScrollView>
    )
  }

  render() {
    if (this.props.stocks.length > 0 ||
      this.props.news.length > 0)
      return this.renderStocks()
    else
      return this.renderEmptyStock()
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.main.stocks,
    news: state.main.news,
    selectedStock: state.stock.selectedStock,
    selectedNews: state.news.selectedNews,
    serverDomain: state.appSetting.serverDomain,
    style: state.style
  }
}

export default connect(mapStateToProps, { setSelectedStock, setSelectedNews })(StocksScreen)