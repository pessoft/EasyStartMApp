import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { catalogStackNavigator } from './catalogStackNavigator'
import { CATALOG_TAB } from './pointsNavigate';
import IcoMenu from '../images/font-awesome-svg/soup.svg'
import { store } from '../store/store'

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
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: style.theme.darkPrimaryColor.backgroundColor,
                borderTopColor: style.theme.dividerColor.borderColor
            },
            activeTintColor: style.theme.textPrimaryColor.color,
            inactiveTintColor: style.theme.secondaryTextColor.color,
            showLabel: true,
            keyboardHidesTabBar: true
        },
        initialRouteName: CATALOG_TAB
    })