import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Register from './landing/Register'
import Login from './landing/Login'
import { LightMode } from 'assets/colors/LightMode'
import Reset from './landing/Reset'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CalendarOverview from './recipe/CalendarOverview'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import IconMA from 'react-native-vector-icons/MaterialIcons'; 
import Profile from './Profile'
import Settings from './Settings'
import ViewCalendar from './recipe/ViewCalendar'

const Tab = createMaterialBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function AppStack() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: LightMode.white,
      secondaryContainer: LightMode.white
    }
  }
  
  return (
    <NavigationContainer theme={ theme }>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
        <Stack.Screen name="LandingStack" component={ LandingStack } />
        <Stack.Screen name="BottomTab" component={ BottomTab } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const LandingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={ Login } />
      <Stack.Screen name="Register" component={ Register } />
      <Stack.Screen name="Reset" component={ Reset } />
    </Stack.Navigator>
  )
}

const RecipeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ViewCalendar">
      <Stack.Screen name="Profile" component={ Profile } />
      <Stack.Screen name="Settings" component={ Settings } />
      <Stack.Screen name="CalendarOverview" component={ CalendarOverview } />
      <Stack.Screen name="ViewCalendar" component={ ViewCalendar } />
    </Stack.Navigator>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Planner"
      activeColor={ LightMode.blue }
      inactiveColor={ LightMode.black }
      barStyle={{ 
        backgroundColor: `${ LightMode.white }`
      }}
      screenOptions={{
        
      }}
    >
      <Tab.Screen 
        name="PLANNER" 
        component={ RecipeStack } 
        options={{
          tabBarIcon: ({ color }) => (
            <IconMA 
              name="calendar-month"
              color={ color }
              size={ 28 }
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}