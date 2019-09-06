import React from 'react'
import { store } from '../store/store'

import { CATALOG_TAB } from './pointsNavigate';

import { createBottomTabNavigator } from 'react-navigation'
import { catalogStackNavigator } from './catalogStackNavigator'
import { stockStackNavigator } from './stockStackNavigator'
import { checkoutStackNavigator } from './checkoutStackNavigator'
import { infoStackNavigator } from './infoStackNavigator'
import { organizationReviewsStackNavigator } from './organizationReviewsStackNavigator'
import { profileStackNavigator } from './profileStackNavigator'

import IcoMenu from '../images/font-awesome-svg/soup.svg'
import IcoStock from '../images/font-awesome-svg/badge-percent.svg'
import IcoShoppingBasket from '../images/font-awesome-svg/shopping-basket.svg'
import IcoInfo from '../images/font-awesome-svg/info.svg'
import IcoReviews from '../images/font-awesome-svg/comment-lines.svg'
import IcoUserCog from '../images/font-awesome-svg/user-cog.svg'


const state = store.getState()
const style = state.style

export const mainBottomTab = createBottomTabNavigator(
    {
        CatalogTab: {
            screen: catalogStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Меню',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoMenu width={20} height={20} color={tintColor} />
                }
            }
        },
        StockTab: {
            screen: stockStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Акции',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoStock width={20} height={20} color={tintColor} />
                }
            }
        },
        CheckoutTab: {
            screen: checkoutStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Корзина',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoShoppingBasket width={20} height={20} color={tintColor} />
                }
            }
        },
        InfoTab: {
            screen: infoStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Инфо',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoInfo width={20} height={20} color={tintColor} />
                }
            }
        },
        OrganizationReviewsTab: {
            screen: organizationReviewsStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Отзывы',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoReviews width={20} height={20} color={tintColor} />
                }
            }
        },
        ProfileTab: {
            screen: profileStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Профиль',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <IcoUserCog width={20} height={20} color={tintColor} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: style.theme.navigationBottom.backgroundColor,
                borderTopColor: style.theme.dividerColor.borderColor
            },
            activeTintColor: style.theme.primaryTextColor.color,
            inactiveTintColor: style.theme.secondaryTextColor.color,
            showLabel: true,
            keyboardHidesTabBar: true
        },
        initialRouteName: CATALOG_TAB
    })
