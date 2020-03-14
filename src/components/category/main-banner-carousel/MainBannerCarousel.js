import React from 'react'
import { TouchableWithoutFeedback, Dimensions, View } from 'react-native'
import Image from 'react-native-scalable-image'
import Carousel from 'react-native-banner-carousel'
import Style from './style'
import { NewsType } from '../../../helpers/news-type'

const BannerWidth = Dimensions.get('window').width - 24

export class MainBannerCarousel extends React.Component {
  onPress = (newsType, data) => {
    if (this.props.onPress) {
      this.props.onPress(newsType, data)
    }
  }

  renderItemCarousel = (data, newsType, key) => {
    return (
      <TouchableWithoutFeedback
        key={key}
        onPress={() => this.onPress(newsType, data)}>
        <Image
          style={Style.image}
          width={BannerWidth}
          source={data.Image}
          resizeMode='stretch' />
      </TouchableWithoutFeedback>
    )
  }

  getData = () => {
    let itemCarousel = []
    for (const newsType in this.props.items) {
      for (const item of this.props.items[newsType]) {
        const key = `${newsType}_${item.Id}`
        itemCarousel.push(this.renderItemCarousel(item, newsType, key))
      }
    }

    return itemCarousel
  }

  render = () => {
    return (
      <View
        style={[
          this.props.style.theme.themeBody,
          Style.bannerContainer,
          this.props.style.theme.shadowColor,
        ]}>
        <Carousel
          showsPageIndicator={true}
          autoplay
          autoplayTimeout={2500}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {this.getData()}
        </Carousel>
      </View>
    )
  }
}