import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { LightMode } from 'assets/colors/LightMode'
import Spacer from './Spacer'
import PropTypes from 'prop-types'

export default function RecipeMoreDetails( { name, image, calories, carbo, protein, fibers, fats, cholesterols, sugars }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <View style={ s.container }>
      <View style={ s.topContainer }>
        <Image 
          resizeMode="cover"
          source={{ uri: image }}
          style={ s.image }
        />

        <View style={ s.topSideContainer }>
          <Text style={ s.heading }>{ name }</Text>
          <Text style={ s.sub }>{ calories } <Text style={ s.inSub }>kcal</Text></Text>
        </View>
      </View>

      <Spacer size={ 10 } />

      <View style={ s.botContainer }>
        <View style={ s.botSection }>
          <View style={ s.box }>
            <Text style={ s.boxTitle }>Carbohydrates</Text>
            <Text style={ s.boxSub }>{ carbo | 0 } { carbo > 0 ? "grams" : "gram" }</Text>
          </View>

          <View style={ s.box }>
            <Text style={ s.boxTitle }>Proteins</Text>
            <Text style={ s.boxSub }>{ protein | 0 } { protein > 0 ? "grams" : "gram" }</Text>
          </View>

          <View style={ s.box }>
            <Text style={ s.boxTitle }>Fibers</Text>
            <Text style={ s.boxSub }>{ fibers | 0 } { fibers > 0 ? "grams" : "gram" }</Text>
          </View>

          <View style={ s.box }>
            <Text style={ s.boxTitle }>Sugars</Text>
            <Text style={ s.boxSub }>{ sugars | 0 } { sugars > 0 ? "grams" : "gram" }</Text>
          </View>
        </View>
        <View style={ s.botSection }>
          <View style={ s.box }>
            <Text style={ s.boxTitle }>Fats</Text>
            <Text style={ s.boxSub }>{ fats | 0 } { fats > 0 ? "grams" : "gram" }</Text>
          </View>

          <View style={ s.box }>
            <Text style={ s.boxTitle }>Cholesterol</Text>
            <Text style={ s.boxSub }>{ cholesterols | 0 } { cholesterols > 0 ? "grams" : "gram" }</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    marginTop: 10,
    padding: 15,
    backgroundColor: LightMode.white,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
  },
  "topContainer": {
    flex: 1,
    flexDirection: "row",
    gap: 10
  },
  "image": {
    borderRadius: 10,
    width: 125,
    height: "auto"
  },
  "topSideContainer": {
    flex: 1,
    gap: 10,
    justifyContent: "space-between"
  },
  "heading": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "sub": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.yellow
  },
  "inSub": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.black
  },
  "botContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  "botSection": {
    flex: 1,
    gap: 5,
    justifyContent: "flex-start"
  },
  "box": {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between"
  },
  "boxTitle": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "boxSub": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.halfBlack
  }
})

RecipeMoreDetails.propTypes = {
  name: PropTypes.string.isRequired, 
  image: PropTypes.any.isRequired, 
  calories: PropTypes.number.isRequired, 
  carbo: PropTypes.number, 
  protein: PropTypes.number, 
  fibers: PropTypes.number, 
  fats: PropTypes.number, 
  cholesterols: PropTypes.number, 
  sugars: PropTypes.number
}