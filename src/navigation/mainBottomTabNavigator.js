import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { catalogStackNavigator } from './catalogStackNavigator'
import { CATALOG_TAB } from './pointsNavigate';

export const mainBottomTab = createBottomTabNavigator(
    {
        Catalog: {
            screen: catalogStackNavigator,
            navigationOptions: {
                tabBarLabel: 'Меню',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <Icon name={'concierge-bell'} size={30} color={tintColor} />
                }
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#171717',
            inactiveTintColor: '#777777',
            showLabel: true,
        },
        initialRouteName: CATALOG_TAB
    })