import React from 'react'
import { store } from '../store/store'

import { CATALOG_TAB } from './pointsNavigate';
import { Platform, Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { catalogStackNavigator } from './catalogStackNavigator'
import { stockStackNavigator } from './stockStackNavigator'
import { checkoutStackNavigator } from './checkoutStackNavigator'
import { infoStackNavigator } from './infoStackNavigator'
import { organizationReviewsStackNavigator } from './organizationReviewsStackNavigator'
import { profileStackNavigator } from './profileStackNavigator'

import IcoMenu from '../images/font-awesome-svg/soup.svg'
import IcoNews from '../images/font-awesome-svg/newspaper.svg'
import IcoShoppingBasket from '../images/font-awesome-svg/shopping-basket.svg'
import IcoInfo from '../images/font-awesome-svg/info.svg'
import IcoReviews from '../images/font-awesome-svg/comment-lines.svg'
import IcoUserCog from '../images/font-awesome-svg/home-lg.svg'

import BasketIcoWithBadge from '../components/badges/basket-badge/BasketIcoWithBadge'
import { getSVGColor } from '../helpers/color-helper';
import SideBar from '../components/side-bar/SideBar'

const { height } = Dimensions.get('window')

const getHeightItemDrawer = () => {
    if (height <= 592)
        return 45
    if (height >= 750)
        return 55

    return 50
}

export const drawerNavigator = style => createDrawerNavigator(
    {
        CatalogTab: {
            screen: catalogStackNavigator(style),
            navigationOptions: {
                drawerLabel: 'Меню',
                drawerIcon: ({ tintColor }) => {
                    return <IcoMenu width={22} height={22} color={getSVGColor(tintColor)} />
                }
            }
        },
        StockTab: {
            screen: stockStackNavigator(style),
            navigationOptions: {
                drawerLabel: 'Акции и новости',
                drawerIcon: ({ tintColor }) => {
                    return <IcoNews width={22} height={22} color={getSVGColor(tintColor)} />
                }
            }
        },
        CheckoutTab: {
            screen: checkoutStackNavigator(style),
            navigationOptions: {
                drawerLabel: 'Корзина',
                drawerIcon: ({ tintColor }) => {
                    return <IcoShoppingBasket width={22} height={22} color={getSVGColor(tintColor)} />
                    // return <BasketIcoWithBadge
                    //     style={style}
                    //     width={22}
                    //     height={22}
                    //     color={getSVGColor(tintColor)}
                    //     animation={true}
                    //     prefix={'шт'} />
                }
            }
        },
        InfoTab: {
            screen: infoStackNavigator(style),
            navigationOptions: {
                drawerLabel: 'Информация',
                drawerIcon: ({ tintColor }) => {
                    return <IcoInfo width={22} height={22} color={getSVGColor(tintColor)} />
                }
            }
        },
        ProfileTab: {
            screen: profileStackNavigator(style),
            navigationOptions: {
                drawerLabel: 'Личный кабинет',
                drawerIcon: ({ tintColor }) => {
                    return <IcoUserCog width={22} height={22} color={getSVGColor(tintColor)} />
                }
            }
        }
    },
    {
        contentComponent: props => <SideBar {...props} style={style} />,
        drawerPosition: 'right',
        drawerBackgroundColor: style.theme.secondaryThemeBody.backgroundColor,
        hideStatusBar: Platform.OS == 'ios',
        contentOptions: {
            labelStyle: {
                fontSize: style.fontSize.h8.fontSize,
                fontWeight: 'normal',
            },
            activeLabelStyle: {
                color: style.theme.primaryTextColor.color,
            },
            itemStyle: {
                height: getHeightItemDrawer()
            },
            activeBackgroundColor: 'transparent',
            inactiveBackgroundColor: 'transparent',
            activeTintColor: style.theme.accentOther.backgroundColor,
            inactiveTintColor: style.theme.secondaryTextColor.color,

        },
        initialRouteName: CATALOG_TAB
    }
)
