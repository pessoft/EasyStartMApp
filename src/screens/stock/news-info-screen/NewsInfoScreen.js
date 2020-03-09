import React from 'react'
import { Animated, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import { timingAnimation } from '../../../animation/timingAnimation'
import Image from 'react-native-scalable-image'
import Style from './style'

class NewsInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('NewsTitle', 'Новости'),
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
        style={[{ transform: [{ scale: this.state.showScaleAnimation }] }]}>
        <Image
          style={Style.image}
          source={this.props.selectedNews.Image}
          width={Dimensions.get('window').width - 24}
          resizeMode='contain' />
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