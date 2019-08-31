import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { catalogStackNavigator } from './catalogStackNavigator'
import { CATALOG_TAB } from './pointsNavigate';
import IcoMenu from '../images/font-awesome-svg/soup.svg'

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
            activeTintColor: '#171717',
            inactiveTintColor: '#777777',
            showLabel: true,
            keyboardHidesTabBar: true
        },
        initialRouteName: CATALOG_TAB
    })