import { LightMode } from 'assets/colors/LightMode';
import { useFontFromContext } from 'context/FontProvider';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'; 
import IconFA from 'react-native-vector-icons/FontAwesome';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PropTypes from 'prop-types'

export default function RoundedBorderButton( { onPress, icon, name, text, color, textColor, borderRadius }: any ) {  
  const rippleScale = useSharedValue( 0 )
  const rippleOpacity = useSharedValue( 1 )
  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value
  }))

  const handlePressIn = () => {
    rippleScale.value = 0;
    rippleOpacity.value = 1;
    rippleScale.value = withTiming( 2, {
      duration: 750,
      easing: Easing.out( Easing.ease ),
    });
    rippleOpacity.value = withTiming( 0, {
      duration: 750,
      easing: Easing.out( Easing.ease ),
    });
  };
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <Pressable 
      onPress={ onPress } 
      onPressIn={ handlePressIn } 
      style={[ s.container, { backgroundColor: color, borderRadius: borderRadius } ]}
    >
      <View style={ s.wrapper }>
        { icon === "MA" ?
          <IconMA 
            name={ name }
            color={ LightMode.white }
            size={ 24 }
          />
          : 
          <IconFA
            name={ name }
            color={ LightMode.white }
            size={ 24 }
          />
        }
        <Text style={[ s.buttonText, { color: textColor } ]}>{ text }</Text>
      </View>
      <Animated.View style={[ s.ripple, rippleStyle ]} />
    </Pressable>
  )
}

const s = StyleSheet.create({
  "container": {
    marginHorizontal: 20,
    padding: 10,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    overflow: "hidden"
  },
  "wrapper": {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  "ripple": {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LightMode.darkGrey,
    borderRadius: 100,
  },
  "buttonText": {
    fontFamily: "cantarell",
    fontSize: 16,
  }
})

RoundedBorderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
}

RoundedBorderButton.defaultProps = {
  icon: "FA"
}