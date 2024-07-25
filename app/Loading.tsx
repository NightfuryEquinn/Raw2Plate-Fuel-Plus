import { LightMode } from 'assets/colors/LightMode'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get( 'window' )

export default function Loading() {
  const animatedValue = useSharedValue(0)

  animatedValue.value = withRepeat(
    withTiming( 1, {
      duration: 2500,
      easing: Easing.linear
    }),
    -1,
    false
  )

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue.value,
      [ 0, 1 ],
      [ -width, width ]
    )

    return {
      transform: [{ translateX }]
    }
  })

  return (
    <SafeAreaView style={ s.container }>
      <View style={ s.header }>
        <Animated.View style={[ s.square, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>

        <Animated.View style={[ s.square, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>

      <View style={ s.placeholder }>
        <Animated.View style={[ s.wrapper, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>

      <View style={ s.placeholder }>
        <Animated.View style={[ s.wrapper, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>

      <View style={ s.header }>
        <Animated.View style={[ s.square, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>

        <Animated.View style={[ s.square, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>

      <View style={ s.placeholder }>
        <Animated.View style={[ s.wrapper, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>

      <View style={ s.placeholder }>
        <Animated.View style={[ s.wrapper, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>
      
      <View style={ s.header }>
        <Animated.View style={[ s.square, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>

        <Animated.View style={[ s.square, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>

      <View style={ s.placeholder }>
        <Animated.View style={[ s.wrapper, animatedStyle ]}>
          <LinearGradient 
            colors={[ LightMode.grey, LightMode.darkGrey, LightMode.grey ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ s.gradient }
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    borderRadius: 10,
    padding: 30,
    backgroundColor: LightMode.white,
    alignContent: 'center',
    justifyContent: 'center'
  },
  "header": {
    marginBottom: 15, 
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: LightMode.grey
  },
  "square": {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    height: 60,
  },
  "placeholder": {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    height: 30,
    backgroundColor: LightMode.grey
  },
  "wrapper": {
    ...StyleSheet.absoluteFillObject,
  },
  "gradient": {
    flex: 1
  }
})