import { LightMode } from 'assets/colors/LightMode';
import { useFontFromContext } from 'context/FontProvider';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMA from 'react-native-vector-icons/MaterialIcons';

export default function RoundedBorderButton( { onPress, disabled, icon, name, text, color, textColor, borderRadius, marginHori }: any ) {  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity 
      activeOpacity={ 0.5 }
      disabled={ disabled }
      onPress={ onPress } 
      style={[ s.container, { backgroundColor: color, borderRadius: borderRadius, marginHorizontal: marginHori } ]}
    >
      <View style={ s.wrapper }>
        { name ? (
          icon === "MA" ?
          <IconMA 
            name={ name }
            color={ LightMode.white }
            size={ 20 }
          />
          : 
          <IconFA
            name={ name }
            color={ LightMode.white }
            size={ 20 }
          />
          ) : null
        }
        <Text style={[ s.buttonText, { color: textColor } ]}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    minWidth: "45%",
    padding: 10,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible"
  },
  "wrapper": {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  "buttonText": {
    fontFamily: "cantarell",
    fontSize: 16,
  }
})

RoundedBorderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  marginHori: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
}

RoundedBorderButton.defaultProps = {
  disabled: false,
  icon: "FA",
  name: "",
  marginHori: 20,
}