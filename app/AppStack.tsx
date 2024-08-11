import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LightMode } from 'assets/colors/LightMode'
import React, { useState } from 'react'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import IconEN from 'react-native-vector-icons/Entypo'
import Profile from './Profile'
import Settings from './Settings'
import Login from './landing/Login'
import Register from './landing/Register'
import Reset from './landing/Reset'
import CalendarOverview from './recipe/CalendarOverview'
import ViewCalendar from './recipe/ViewCalendar'
import RecipeManager from './recipe/RecipeManager'
import RecipeDetail from './recipe/RecipeDetail'
import RecipeNarration from './recipe/RecipeNarration'
import DiscoverRecipe from './recipe/DiscoverRecipe'
import Bookmark from './recipe/Bookmark'
import Timer from './recipe/Timer'

const Tab = createMaterialBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function AppStack() {
  const [ isLoggedIn, setIsLoggedIn ] = useState( true )

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
      { isLoggedIn ? <MainStack /> : <LandingStack /> }
    </NavigationContainer>
  )
}

const MainStack = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
      <Drawer.Screen name="BottomTab" component={ BottomTab } />
      <Drawer.Screen name="Recipe Manager" component={ RecipeManager } />
      <Drawer.Screen name="View Calendar" component={ ViewCalendar } />
      <Drawer.Screen name="Discover" component={ DiscoverRecipe } />
      <Drawer.Screen name="Bookmarks" component={ Bookmark } />
      <Drawer.Screen name="Timers" component={ Timer } />
      <Drawer.Screen name="Profile" component={ Profile } />
      <Drawer.Screen name="Settings" component={ Settings } />
    </Drawer.Navigator>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator 
      initialRouteName="RECIPES"
      activeColor={ LightMode.blue }
      inactiveColor={ LightMode.black }
      barStyle={{ 
        backgroundColor: `${ LightMode.white }`
      }}
    >
      <Tab.Screen 
        name="PLANNER" 
        component={ PlannerStack } 
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

      <Tab.Screen 
        name="RECIPES" 
        component={ RecipeStack } 
        options={{
          tabBarIcon: ({ color }) => (
            <IconEN 
              name="bowl"
              color={ color }
              size={ 28 }
            />
          )
        }}
      />
    </Tab.Navigator>
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

const PlannerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CalendarOverview">
      <Stack.Screen name="CalendarOverview" component={ CalendarOverview } />
      <Stack.Screen name="ViewCalendar" component={ ViewCalendar } />
      <Stack.Screen name="RecipeManager" component={ RecipeManager } />
      <Stack.Screen name="RecipeDetail" component={ RecipeDetail } />
      <Stack.Screen name="RecipeNarration" component={ RecipeNarration } />
    </Stack.Navigator>
  )
}

const RecipeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DiscoverRecipe">
      <Stack.Screen name="DiscoverRecipe" component={ DiscoverRecipe } />
      <Stack.Screen name="RecipeDetail" component={ RecipeDetail } />
    </Stack.Navigator>
  )
}