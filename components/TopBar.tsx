import { DrawerActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { LightMode } from 'assets/colors/LightMode';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import IconMA from 'react-native-vector-icons/MaterialIcons';

export default function TopBar() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  return (
    <View>
      <View style={ s.topBar }>
        <Pressable onPress={ () => navigation.dispatch( DrawerActions.toggleDrawer() ) }>
          <IconMA 
            name="menu"
            color={ LightMode.black }
            size={ 24 }
          />
        </Pressable>
        
        <View style={ s.topBarRight }>
          <Pressable onPress={ () => navigation.navigate( "Settings" ) }>
            <IconMA 
              name="settings"
              color={ LightMode.black }
              size={ 24 }
            />
          </Pressable>

          <Pressable style={ s.marginLeft } onPress={ () => navigation.navigate( "Profile" ) }>
            <IconMA 
              name="account-circle"
              color={ LightMode.black }
              size={ 24 }
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  "marginLeft": {
    marginLeft: 20
  },
  "topBar": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "topBarRight": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})