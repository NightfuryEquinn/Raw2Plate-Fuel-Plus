import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Register from './landing/Register'
import Login from './landing/Login'
import { LightMode } from 'assets/colors/LightMode'
import Reset from './landing/Reset'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CalendarOverview from './recipe/CalendarOverview'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function AppStack() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: LightMode.white
    }
  }
  
  return (
    <NavigationContainer theme={ theme }>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LandingStack">
        <Stack.Screen name="LandingStack" component={ LandingStack } />
        <Stack.Screen name="RecipeStack" component={ RecipeStack } />
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
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CalendarOverview">
      <Stack.Screen name="CalendarOverview" component={ CalendarOverview } />
    </Stack.Navigator>
  )
}