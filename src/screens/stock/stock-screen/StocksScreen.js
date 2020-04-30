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
import NewspaperIcon from '../../../images/font-awesome-svg/newspaper.svg'
import Style from './style'
import { StockCard } from '../../../components/stock/StockCard'
import { STOCK_INFO, NEWS_INFO } from '../../../navigation/pointsNavigate'
import { getSVGColor } from '../../../helpers/color-helper'
import { NewsType } from '../../../helpers/news-type'
import { BarsButton } from '../../../components/buttons/Square/BarsButton'
import BasketIcoWithBadge from '../../../components/badges/basket-badge/BasketIcoWithBadge'

class StocksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const style = navigation.getParam('style', null)

    return {
      headerTitle: 'Акции и новости',
      headerTitleStyle: {
        textAlign: Platform.OS == 'ios' ? 'center' : 'left',
        flex: 1,
      },
      headerRight: () => <BasketIcoWithBadge
        containerStyle={{ paddingHorizontal: 25 }}
        navigation={navigation}
        width={28}
        height={28}
        animation={true} />,
      headerLeft: () => <BarsButton
        timeout={0}
        containerStyle={{ paddingHorizontal: 20 }}
        disabled={false}
        onPress={() => navigation.openDrawer()}
        size={25}
        nonBorder={true}
        color={style ? style.theme.textPrimaryColor.color : '#fff'} />
    }
  }


  constructor(props) {
    super(props)

    this.props.navigation.setParams({
      style: this.props.style,
    })

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
        <NewspaperIcon
          width={90}
          height={90}
          color={getSVGColor(this.props.style.theme.secondaryTextColor.color)}
        />
        <View style={Style.textInfo}>
          <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>У нас пока</Text>
          <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>нет новостей</Text>
        </View>

      </Animated.View>
    )
  }

  getData = () => {
    let items = []

    if (this.props.stocks.length > 0) {
      this.props.stocks.forEach(p => {
        items.push({
          id: p.Id,
          name: p.Name,
          description: p.Description,
          image: p.Image,
          type: NewsType.stock,
          onPress: this.onSelectedStock
        })
      })
    }

    if (this.props.news.length > 0) {
      this.props.news.forEach(p => {
        items.push({
          id: p.Id,
          name: p.Title,
          description: p.Description,
          image: p.Image,
          type: NewsType.news,
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
          keyExtractor={(item => `${item.id}_${item.type}`)}
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