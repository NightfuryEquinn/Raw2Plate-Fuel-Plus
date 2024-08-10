import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LightMode } from 'assets/colors/LightMode'
import React from 'react'
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
        
        <Stack.Screen name="Profile" component={ Profile } />
        <Stack.Screen name="Settings" component={ Settings } />
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