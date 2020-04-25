import React from 'react'
import {
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    View,
    Image,
    Linking
} from 'react-native'
import Style from './style'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { defaultState as appSettingStore } from '../../store/app-settings/reducer'
import { ListItem } from '../../components/list-item/ListItem'
import Ruble from '../../images/font-awesome-svg/ruble-sign.svg'
import MapMarkerIcon from '../../images/font-awesome-svg/map-marker-alt.svg'
import PhoneIcon from '../../images/font-awesome-svg/phone.svg'
import { connect } from 'react-redux'
import { priceValid } from '../../helpers/utils'
import EmailIcon from '../../images/font-awesome-svg/at.svg'
import FacebookIcon from '../../images/font-awesome-svg/facebook-f.svg'
import InstagramIcon from '../../images/font-awesome-svg/instagram.svg'
import VkIcon from '../../images/font-awesome-svg/vk.svg'
import { FacebookButton } from '../buttons/Square/FacebookButton'
import { VKButton } from '..//buttons/Square/VKButton'
import { InstagrammButton } from '../buttons/Square/InstagrammButton'
import { CASHBACK_PROFILE } from '../../navigation/pointsNavigate'

class SideBar extends React.Component {

    goToCashbackScreen = () => {
        if (this.props.promotionCashbackSetting.IsUseCashback)
            this.props.navigation.navigate(CASHBACK_PROFILE)
    }

    onCall = phoneNumber => {
        try {
          const phone = phoneNumber.replace(/[(,),-]/g, '')
          Linking.openURL(`tel:${phone}`)
        } catch{ }
      }

      onOpenSocialLink = link => {
        try {
          if (link.indexOf('http://') == -1 &&
          link.indexOf('https://') == -1)
            Linking.openURL(`http://${link}`)
          else
            Linking.openURL(link)
        } catch{ }
      }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={[
                    Style.logoContainer,
                    this.props.style.theme.dividerColorSecondary
                ]}>
                    <Image style={Style.logo} source={appSettingStore.logo} />
                </View>
                <View style={Style.items}>
                    <DrawerNavigatorItems {...this.props} />
                </View>
                <View style={[
                    Style.additionalInfo,
                    this.props.style.theme.themeBody,
                    this.props.style.theme.dividerColorSecondary
                ]}>
                    <ListItem
                        style={this.props.style}
                        icon={Ruble}
                        text={priceValid(this.props.user.virtualMoney)}
                        onPress={this.goToCashbackScreen}
                    />
                    <ListItem
                        style={this.props.style}
                        icon={MapMarkerIcon}
                        text={this.props.organizationSettings.City}
                    // onPress={() => this.props.navigation.navigate(COLOR_THEME_PROFILE)}
                    />
                    <ListItem
                        style={this.props.style}
                        icon={PhoneIcon}
                        text={this.props.organizationSettings.PhoneNumber}
                        onPress={() => this.onCall(this.props.organizationSettings.PhoneNumber)}
                    />
                    <View style={Style.social}>
                        {
                            this.props.organizationSettings.Instagram &&
                            <View style={Style.btnSocialWrapper}>
                                <InstagrammButton
                                    disabled={false}
                                    onPress={() => this.onOpenSocialLink(this.props.organizationSettings.Instagram)}
                                    size={28}
                                    nonBorder={true}
                                    color={this.props.style.theme.secondaryTextColor.color}
                                />
                            </View>
                        }
                        {
                            this.props.organizationSettings.Vkontakte &&
                            <View style={Style.btnSocialWrapper}>
                                <VKButton
                                    disabled={false}
                                    onPress={() => this.onOpenSocialLink(this.props.organizationSettings.Vkontakte)}
                                    size={28}
                                    nonBorder={true}
                                    color={this.props.style.theme.secondaryTextColor.color}
                                />
                            </View>
                        }
                        {
                            this.props.organizationSettings.Facebook &&
                            <View style={Style.btnSocialWrapper}>
                                <FacebookButton
                                    disabled={false}
                                    onPress={() => this.onOpenSocialLink(this.props.organizationSettings.Facebook)}
                                    size={28}
                                    nonBorder={true}
                                    color={this.props.style.theme.secondaryTextColor.color}
                                />
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        style: state.style,
        user: state.user,
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        organizationSettings: state.main.organizationSettings
    }
}

export default connect(mapStateToProps)(SideBar)