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
import AppDrawer from './AppDrawer'
import { useFontFromContext } from 'context/FontProvider'
import MainTracker from './tracker/MainTracker'
import MoreDetails from './tracker/MoreDetails'
import AllNutrients from './tracker/AllNutrients'
import ManualAdd from './tracker/ManualAdd'

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

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <NavigationContainer theme={ theme }>
      { isLoggedIn ? <MainStack /> : <LandingStack /> }
    </NavigationContainer>
  )
}

const MainStack = () => {
  return (
    <Drawer.Navigator 
      drawerContent={ props => <AppDrawer { ...props } /> } 
      screenOptions={{ headerShown: false }} 
      initialRouteName="Home"
    >
      <Drawer.Screen 
        name="Home" 
        component={ BottomTab }
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconEN 
              name="home"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Bookmarks" 
        component={ Bookmark } 
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14 
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconMA 
              name="bookmark"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Timers" 
        component={ Timer } 
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14 
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconMA 
              name="timer"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ Profile } 
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14 
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconMA 
              name="account-circle"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={ Settings } 
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14 
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconMA 
              name="settings"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Daily Intakes" 
        component={ MoreDetails } 
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14 
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconMA 
              name="flatware"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Daily Nutrients" 
        component={ AllNutrients } 
        options={{
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: "cantarell", 
            fontWeight: 900, 
            fontSize: 14 
          },
          drawerActiveBackgroundColor: LightMode.darkGrey,
          drawerActiveTintColor: LightMode.black,
          drawerInactiveTintColor: LightMode.halfBlack,
          drawerIcon: ({ color }) => (
            <IconEN 
              name="leaf"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator 
      initialRouteName="PLANNER"
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

      <Tab.Screen 
        name="TRACKER"
        component={ TrackerStack }
        options={{
          tabBarIcon: ({ color }) => (
            <IconMA 
              name="insert-chart"
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

const TrackerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTracker">
      <Stack.Screen name="MainTracker" component={ MainTracker } />
      <Stack.Screen name="ManualAdd" component={ ManualAdd } />
    </Stack.Navigator>
  )
}