import React from 'react'
import { TouchableWithoutFeedback, Dimensions, View } from 'react-native'
import Image from 'react-native-scalable-image'
import Carousel from 'react-native-banner-carousel'
import Style from './style'
const BannerWidth = Dimensions.get('window').width;

export class StockBannerCarousel extends React.Component {
  onPress = stock => {
    if (this.props.onPress) {
      this.props.onPress(stock)
    }
  }

  renderItemCarousel = (stock, index) => {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => this.onPress(stock)}>
        <Image
          width={BannerWidth}
          source={stock.Image}
          resizeMode='stretch' />
      </TouchableWithoutFeedback>
    )
  }

  render = () => {
    return (
      <View
        style={[
          this.props.style.theme.themeBody,
          Style.bannerContainer
        ]}>
        <Carousel
          showsPageIndicator={false}
          autoplay
          autoplayTimeout={2300}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {this.props.stocks.map((stock, index) => this.renderItemCarousel(stock, index))}
        </Carousel>
      </View>
    )
  }
}