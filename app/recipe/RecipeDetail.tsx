import { LightMode } from 'assets/colors/LightMode'
import AddRecipeToPlannerModal from 'components/AddRecipeToPlannerModal'
import AddRecipeToTrackerModal from 'components/AddRecipeToTrackerModal'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function RecipeDetail( { navigation, route }: any ) {
  // const { recipeData } = route.params
  
  const allergy = [ "Gluten", "Pork", "Milk", "Crustaceans", "Peanuts", "Mustard", "Celery" ]

  const ingredients = [
    "12 ounces of linguine pasta",
    "4 tablespoons of butter",
    "4-5 cloves of garlic, minced",
    "1 cup of heavy cream",
    "1 cup of Parmesan cheese, grated",
    "2 tablespoons of parsley, chopped",
    "Salt to taste",
    "Black pepper to taste",
    "A pinch of red pepper",
    "1 teaspoon of lemon zest",
    "1-2 tablespoon of olive oil"
  ]

  const steps = [
    "Bring a large pot of salted water to a boil. Add the linguine pasta and cook according to package instructions until al dente. Reserve 1 cup of pasta water and then drain the pasta.",
    "In a large skillet, melt the butter over medium heat. Add the minced garlic and sauté until fragrant, about 1-2 minutes. Be careful not to burn the garlic.",
    "Pour in the heavy cream and bring it to a gentle simmer. Add the grated Parmesan cheese and stir until the cheese is melted and the sauce is smooth. Season with salt, black pepper, and red pepper flakes (if using) to taste. If the sauce is too thick, gradually add the reserved pasta water until you reach the desired consistency.",
    "Add the cooked and drained linguine to the skillet with the sauce. Toss to coat the pasta evenly with the sauce.",
    "If using grilled chicken, shrimp, spinach, or mushrooms, add them to the skillet and toss to combine. Cook for an additional 2-3 minutes until everything is heated through. If adding lemon zest, sprinkle it over the pasta and mix well.",
    "Transfer the pasta to serving plates. Garnish with chopped parsley and drizzle with olive oil if desired. Serve immediately with extra grated Parmesan cheese on the side."
  ]

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )
  const [ openDrop, setOpenDrop ] = useState( false )
  const [ dropValue, setDropValue ] = useState( "" )

  const dropItems = [
    { label: 'Breakfast', value: 'BKF' },
    { label: 'Brunch', value: 'BRH' },
    { label: 'Lunch', value: 'LUN' },
    { label: 'Tea Time', value: 'TEA' },
    { label: 'Dinner', value: 'DIN' }
  ]

  const [ trackModal, setTrackModal ] = useState( false )
  const [ trackModalDate, setTrackModalDate ] = useState( dayjs() )

  const showModal = () => {
    setModal( !modal )
  }

  const showTrackModal = () => {
    setTrackModal( !trackModal )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Parmesan Garlic Linguine Pasta</Text>

        <Spacer size={ 10 } />

        <ScrollView
          style={{ margin: -20, marginTop: -7.5, }}
          contentContainerStyle={{ padding: 20, paddingTop: 7.5 }}
          showsVerticalScrollIndicator={ false }
        >

          <View style={ s.subContainer }>
            <View style={ s.detailWrapper }>
              <Text style={[ s.sub, s.yellow ]}>By</Text>
              <Text numberOfLines={ 1 } style={[ s.sub, { flex: 1 } ]}>Sacrilegious Anonymous Illegal Horse</Text>
            </View>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => console.log( "Share" ) }
              style={ s.iconContainer }
            >
              <IconMA 
                name="share"
                color={ LightMode.white }
                size={ 16 }
              />
            </TouchableOpacity>
          </View>

          <Spacer size={ 10 } />

          <View style={ s.imageWrapper }>
            <Image 
              resizeMode="cover"
              source={ require( "../../assets/images/linguine.jpg" ) }
              style={ s.image }
            />
          </View>

          <Spacer size={ 5 } />

          <View style={[ s.detailWrapper, { marginLeft: "auto" } ]}>
            <Text style={ s.sub }>45 minutes</Text>
            <Text style={[ s.sub, s.yellow ]}>|</Text>
            <Text style={ s.sub }>2 servings</Text>
            <Text style={[ s.sub, s.yellow ]}>|</Text>
            <Text style={ s.sub }>460 kcal</Text>
          </View>

          <Spacer size={ 20 } />

          <View style={ s.section }>
            <View style={ s.sectionContainer }>
              <Image 
                resizeMode="cover"
                source={ require( "../../assets/images/warning.png" ) }
                style={ s.icon }
              />

              <Text style={ s.sectionHeading }>Allergy Information</Text>
            </View>

            <View style={[ s.sectionContent, { flexDirection: "row", columnGap: 5, rowGap: 10 } ]}>
              {
                allergy.map(( name: string, index: number ) => (
                  <View key={ index } style={ s.box }>
                    <Text style={ s.boxText }>{ name }</Text>
                  </View>
                ))
              }
            </View>
          </View>

          <Spacer size={ 20 } />

          <View style={ s.section }>
            <View style={ s.sectionContainer }>
              <Image 
                resizeMode="cover"
                source={ require( "../../assets/images/ingredients.png" ) }
                style={ s.icon }
              />

              <Text style={ s.sectionHeading }>Ingredients List</Text>
            </View>

            <View style={[ s.sectionContent, { gap: 5, flexWrap: "nowrap" } ]}>
              {
                ingredients.map(( name: string, index: number ) => (
                  <Text key={ index } style={[ s.boxText, { color: LightMode.black, fontSize: 16 } ]}>• { name }</Text>
                ))
              }
            </View>
          </View>

          <Spacer size={ 20 } />

          <View style={ s.section }>
            <View style={ s.sectionContainer }>
              <Image 
                resizeMode="cover"
                source={ require( "../../assets/images/recipe.png" ) }
                style={ s.icon }
              />

              <Text style={ s.sectionHeading }>Guiding Steps</Text>
            </View>

            <View style={[ s.sectionContent, { gap: 15, flexWrap: "nowrap" } ]}>
              {
                steps.map(( name: string, index: number ) => (
                  <Text key={ index } style={[ s.boxText, { color: LightMode.black, fontSize: 16 } ]}>{ index + 1 }. { name }</Text>
                ))
              }
            </View>
          </View>
        </ScrollView>

        <Spacer size={ 30 } />

        <View style={ s.actionContainer }>
          <View style={ s.actionWrapper }>
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => console.log( "Bookmark" ) }
              style={ s.actionIcon }
            >
              <IconMA 
                name="bookmark"
                color={ LightMode.green }
                size={ 32 }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showModal }
              style={ s.actionIcon }
            >
              <IconMA 
                name="add"
                color={ LightMode.blue }
                size={ 32 }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showTrackModal }
              style={ s.actionIcon }
            >
              <IconMA 
                name="insert-chart-outlined"
                color={ LightMode.black }
                size={ 32 }
              />
            </TouchableOpacity>
          </View>
          
          <RoundedBorderButton 
            onPress={ () => navigation.navigate( "RecipeNarration" ) }
            color={ LightMode.yellow }
            text="Start Cooking"
            textColor={ LightMode.white }      
            borderRadius={ 10 }
            marginHori={ 0 }
          />
        </View>
      </View>

      <AddRecipeToPlannerModal 
        modal={ modal }
        showModal={ showModal }
        modalDate= { modalDate }
        setModalDate={ setModalDate }
        openDrop={ openDrop }
        dropValue={ dropValue }
        dropItems={ dropItems }
        setOpenDrop={ setOpenDrop }
        setDropValue={ setDropValue }
        save={ () => {
          console.log( "Save to Planner" )
          console.log( dropValue )
          showModal()
        }}
      />

      <AddRecipeToTrackerModal 
        modal={ trackModal }
        showModal={ showTrackModal }
        modalDate={ trackModalDate }
        setModalDate={ setTrackModalDate }
        save={ () => {
          console.log( "Save to Tracker" )
          showTrackModal()
        }}
      />
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    padding: 30,
    backgroundColor: LightMode.white
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "subContainer": {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  "detailWrapper": {
    flex: 1,
    flexDirection: "row",
    gap: 5
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12
  },
  "yellow": {
    color: LightMode.yellow
  },
  "iconContainer": {
    borderRadius: 10,
    backgroundColor: LightMode.black,
    padding: 5,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "imageWrapper": {
    flexDirection: "row",
    borderRadius: 10,
    shadowColor: LightMode.black,    
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "image": {
    flex: 1,
    height: 140,
    borderRadius: 10,
  },
  "section": {
    gap: 10
  },
  "sectionContainer": {
    gap: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  "sectionContent": {
    flex: 1,
    flexWrap: "wrap"
  },
  "sectionHeading": {
    fontFamily: "fjalla",
    fontSize: 20,
    color: LightMode.black
  },
  "icon": {
    height: 24,
    width: 24
  },
  "actionContainer": {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  "actionWrapper": {
    flexDirection: "row",
    gap: 15
  },
  "actionIcon": {
    borderRadius: 10,
    width: 40,
    height: 40,
    backgroundColor: LightMode.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "box": {
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightMode.blue,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "boxText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.white,
  }
})