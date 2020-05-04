import React from 'react'
import { Animated, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import Style from './style'
import BasketIcoWithBadge from '../../../components/badges/basket-badge/BasketIcoWithBadge'

class NewsInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('NewsTitle', 'Новости'),
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
      },
      headerRight: () => <BasketIcoWithBadge
        containerStyle={{ paddingHorizontal: 20 }}
        navigation={navigation}
        width={28}
        height={28}
        animation={true} />
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({ NewsTitle: this.props.selectedNews.Title })
    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedNews != prevProps.selectedNews) {
      this.props.navigation.setParams({ NewsTitle: this.props.selectedNews.Title })
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
          source={this.props.selectedNews.Image}
        />
        <Text style={[
          this.props.style.theme.backdoor,
          this.props.style.theme.primaryTextColor,
          Style.stockDescription,
          this.props.style.theme.shadowColor,
        ]}
        >
          {this.props.selectedNews.Description}
        </Text>
      </Animated.ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedNews: state.news.selectedNews,
    serverDomain: state.appSetting.serverDomain,
    style: state.style
  }
}

export default connect(mapStateToProps)(NewsInfoScreen)