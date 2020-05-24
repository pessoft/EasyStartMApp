import React from 'react'
import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
export class NewsInfo extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.toggle && this.props.toggle && this.NewsInfo)
      this.NewsInfo.open()
    else if (prevProps.toggle && !this.props.toggle && this.NewsInfo)
      this.NewsInfo.close()
  }

  onClose = () => {
    if (this.props.close) {
      this.props.close()
    }
  }

  render() {
    if (!this.props.news)
      return null

    return (
      <RBSheet
        ref={ref => {
          this.NewsInfo = ref;
        }}
        closeOnDragDown
        animationType='fade'
        duration={200}
        height={245}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: this.props.style.theme.navigationBottom.backgroundColor,
          }
        }}
        onClose={this.onClose}
      >
        <ScrollView style={Style.container}>
          <TouchableOpacity activeOpacity={1}>
            <Image
              style={Style.image}
              source={this.props.news.Image}
            />
            <Text style={[
              this.props.style.theme.backdoor,
              this.props.style.theme.primaryTextColor,
              Style.stockDescription,
              this.props.style.theme.shadowColor,
            ]}
            >
              {this.props.news.Description}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
    )
  }
}