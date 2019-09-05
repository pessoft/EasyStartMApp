import React from 'react'
import { store } from '../store/store'
import { CATALOG_TAB } from './pointsNavigate';
import { createBottomTabNavigator } from 'react-navigation'
import { catalogStackNavigator } from './catalogStackNavigator'
import { stockStackNavigator } from './stockStackNavigator'

import IcoMenu from '../images/font-awesome-svg/soup.svg'
import IcoStock from '../images/font-awesome-svg/badge-percent.svg'


const state = store.getState()
const style = state.style

export const mainBottomTab = createBottomTabNavigator(
    {
        Catalog: {
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
