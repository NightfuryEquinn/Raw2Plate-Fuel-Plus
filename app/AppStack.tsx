import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import React from 'react'
import IconEN from 'react-native-vector-icons/Entypo'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers/store'
import AppDrawer from './AppDrawer'
import Profile from './Profile'
import Settings from './Settings'
import ActiveOrder from './grocery/ActiveOrder'
import BrowseStore from './grocery/BrowseStore'
import GroceryList from './grocery/GroceryList'
import HistoryOrder from './grocery/HistoryOrder'
import InCart from './grocery/InCart'
import InStore from './grocery/InStore'
import Payment from './grocery/Payment'
import Login from './landing/Login'
import Register from './landing/Register'
import Reset from './landing/Reset'
import Bookmark from './recipe/Bookmark'
import CalendarOverview from './recipe/CalendarOverview'
import DiscoverRecipe from './recipe/DiscoverRecipe'
import RecipeDetail from './recipe/RecipeDetail'
import RecipeManager from './recipe/RecipeManager'
import RecipeNarration from './recipe/RecipeNarration'
import Timer from './recipe/Timer'
import ViewCalendar from './recipe/ViewCalendar'
import AllNutrients from './tracker/AllNutrients'
import MainTracker from './tracker/MainTracker'
import ManualAdd from './tracker/ManualAdd'
import MoreDetails from './tracker/MoreDetails'

const Tab = createMaterialBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function AppStack() {
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: LightMode.white,
      secondaryContainer: LightMode.white
    }
  }

  const isUserSessionEmpty = ( session: any ) => {
    if ( session === null ) {
      return true
    }

    return !Object.values( session ).some( 
      value => value !== null && value !== '' && value !== false 
    )
  };

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <NavigationContainer theme={ theme }>
      { !isUserSessionEmpty( data[ 0 ].setUserSession ) ? <MainStack /> : <LandingStack /> }
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
      <Drawer.Screen 
        name="Grocery List" 
        component={ GroceryList } 
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
              name="checklist"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Active Order" 
        component={ ActiveOrder } 
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
              name="delivery-dining"
              color={ color }
              size={ 24 }
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Order History" 
        component={ HistoryOrder } 
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
              name="history"
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

      <Tab.Screen 
        name="GROCERY"
        component={ GroceryStack }
        options={{
          tabBarIcon: ({ color }) => (
            <IconMA 
              name="shopping-bag"
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

const GroceryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BrowseStore">
      <Stack.Screen name="BrowseStore" component={ BrowseStore } />
      <Stack.Screen name="InStore" component={ InStore } />
      <Stack.Screen name="InCart" component={ InCart } />
      <Stack.Screen name="Payment" component={ Payment } />
    </Stack.Navigator>
  )
}