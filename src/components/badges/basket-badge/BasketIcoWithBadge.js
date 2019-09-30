import React from 'react'
import { View, Text } from 'react-native'
import Styles from './style'
import IcoShoppingBasket from '../../../images/font-awesome-svg/shopping-basket.svg'
import { connect } from 'react-redux'

class BasketIcoWithBadge extends React.Component {

  render() {
    if (this.props.totalCountProducts == 0) {
      return <IcoShoppingBasket width={this.props.width} height={this.props.height} color={this.props.color} />
    } else {
      return (
        <View>
         <IcoShoppingBasket width={this.props.width} height={this.props.height} color={this.props.color} />
          <View style={[
            Styles.badge,
            this.props.style.theme.accentColor
          ]}>
            <Text style={[
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h12
            ]}>{`${this.props.totalCountProducts} ${this.props.prefix}`}</Text>
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    totalCountProducts: state.checkout.totalCountProducts
  }
}

export default connect(mapStateToProps)(BasketIcoWithBadge)
