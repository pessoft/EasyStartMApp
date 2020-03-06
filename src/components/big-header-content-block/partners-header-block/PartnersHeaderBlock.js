import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import {PartnersCode} from '../../raw-bottom-sheets/partners-code/PartnersCode'

export class PartnersHeaderBlock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      togglePartnerCodeSheet: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentReferralClientId <= 0 &&
      this.props.parentReferralClientId > 0)
      this.closePartnerCodeSheet()
  }

  showPartnerCodeSheet = () => !this.state.togglePartnerCodeShee && this.setState({ togglePartnerCodeSheet: true })
  closePartnerCodeSheet = () => this.state.togglePartnerCodeSheet && this.setState({ togglePartnerCodeSheet: false })

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.shadowColor,
        this.props.style.theme.navigationHeader,
        this.props.style.theme.dividerColor,
      ]}>
        <View style={[
          Style.itemRow,
          Style.buttonRefCodeContainer
        ]}>
          {
            this.props.parentReferralClientId <= 0 &&
            <SimpleTextButton
            text='Ввести реферальный код'
            onPress={this.showPartnerCodeSheet}
            alignItems='flex-start'
            sizeText={this.props.style.fontSize.h9.fontSize}
            color={this.props.style.theme.primaryTextColor.color}
          />
          }
        </View>
        <View style={Style.itemRow}>
          <Text
            style={[
              Style.textCenter,
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h0,
            ]}>
            {this.props.mainText}
          </Text>
        </View>
        <View style={[
          Style.itemRow,
          Style.secondTextContainer
        ]}>
          <Text
            style={[
              Style.textCenter,
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h9,
            ]}>
            {this.props.secondText}
          </Text>
        </View>
        <PartnersCode
          style={this.props.style}
          toggle={this.state.togglePartnerCodeSheet}
          onClose={this.closePartnerCodeSheet}
          isFetching={this.props.isFetching}
          setParentReferral={this.props.setParentReferral}
        />
      </View>
    )
  }
}