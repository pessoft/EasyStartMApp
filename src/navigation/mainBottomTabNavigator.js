import React from 'react'
import { store } from '../store/store'

import { CATALOG_TAB } from './pointsNavigate';

import { createBottomTabNavigator } from 'react-navigation-tabs'
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

export const mainBottomTab = style => createBottomTabNavigator(
    {
        CatalogTab: {
            screen: catalogStackNavigator(style),
            navigationOptions: {
                tabBarLabel: 'Меню',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoMenu width={20} height={20} color={getSVGColor(tintColor)} />
                }
            }
        },
        StockTab: {
            screen: stockStackNavigator(style),
            navigationOptions: {
                tabBarLabel: 'Новости',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoNews width={20} height={20} color={getSVGColor(tintColor)} />
                }
            }
        },
        CheckoutTab: {
            screen: checkoutStackNavigator(style),
            navigationOptions: {
                tabBarLabel: 'Корзина',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    // return <IcoShoppingBasket width={20} height={20} color={getSVGColor(tintColor)} />
                    return <BasketIcoWithBadge
                        style={style}
                        width={20}
                        height={20}
                        color={getSVGColor(tintColor)}
                        animation={true}
                        prefix={'шт'} />
                }
            }
        },
        InfoTab: {
            screen: infoStackNavigator(style),
            navigationOptions: {
                tabBarLabel: 'Инфо',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoInfo width={20} height={20} color={getSVGColor(tintColor)} />
                }
            }
        },
        ProfileTab: {
            screen: profileStackNavigator(style),
            navigationOptions: {
                tabBarLabel: 'Л.Кабинет',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoUserCog width={20} height={20} color={getSVGColor(tintColor)} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: style.theme.navigationBottom.backgroundColor,
                borderTopColor: style.theme.dividerColor.borderColor,
                borderTopWidth: 0.55,
                paddingTop: 5,
                height: 54,
                alignItems: 'center',
            },
            labelStyle: {
                fontSize: style.fontSize.h10.fontSize,
                paddingBottom: 5,
            },
            activeTintColor: style.theme.primaryTextColor.color,
            inactiveTintColor: style.theme.secondaryTextColor.color,
            showLabel: true,
            keyboardHidesTabBar: true
        },
        initialRouteName: CATALOG_TAB
    })
