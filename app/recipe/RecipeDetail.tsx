import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import AddRecipeToPlannerModal from 'components/AddRecipeToPlannerModal'
import AddRecipeToTrackerModal from 'components/AddRecipeToTrackerModal'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipeInfo, fetchRecipeIngreSteps } from 'redux/actions/recipeAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function RecipeDetail( { navigation, route }: any ) {
  const { recipeId } = route.params

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.recipe )
  const recipeInfo = data[ 0 ].recipeInfo || []
  const recipeIngreSteps = data[ 0 ].recipeIngreSteps || []

  const [ displayIngre, setDisplayIngre ] = useState<string[]>( [] )
  const [ displaySteps, setDisplaySteps ] = useState<string[]>( [] )

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

  const cacheIngredients = ( recipe: any ) => {
    const uniqueIngredients = new Set<string>()

    recipe[ 0 ]?.steps.forEach(( stepItem: any ) => {
      stepItem.ingredients.forEach(( ingredientItem: any ) => {
        uniqueIngredients.add( ingredientItem.name )
      })
    })

    return Array.from( uniqueIngredients )
  }

  const cacheSteps = ( recipe: any ) => {
    const steps: string[] = []

    recipe[ 0 ]?.steps.forEach(( stepItem: any ) => {
      steps.push( stepItem.step )
    })

    return steps
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    if ( data[ 0 ]?.recipeInfo?.id !== recipeId ) {
      dispatch( fetchRecipeInfo( recipeId ) )
      dispatch( fetchRecipeIngreSteps( recipeId ) )
    }

    if ( recipeIngreSteps ) {
      setDisplayIngre( cacheIngredients( recipeIngreSteps ) )
      setDisplaySteps( cacheSteps( recipeIngreSteps ) )
    }
  }, [ data ])
  
  return (
    loading ? <Loading /> :
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>{ recipeInfo.title }</Text>

        <Spacer size={ 20 } />

        <ScrollView
          style={{ margin: -20, marginTop: -7.5, }}
          contentContainerStyle={{ padding: 20, paddingTop: 7.5 }}
          showsVerticalScrollIndicator={ false }
        >

          <View style={ s.subContainer }>
            <View style={ s.detailWrapper }>
              <Text style={[ s.sub, s.yellow ]}>By</Text>
              <Text numberOfLines={ 1 } style={[ s.sub, { flex: 1 } ]}>{ recipeInfo.sourceName }</Text>
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
              source={{ uri: recipeInfo.image }}
              style={ s.image }
            />
          </View>

          <Spacer size={ 5 } />

          <View style={[ s.detailWrapper, { marginLeft: "auto" } ]}>
            <Text style={ s.sub }>{ recipeInfo.readyInMinutes } minutes</Text>
            <Text style={[ s.sub, s.yellow ]}>|</Text>
            <Text style={ s.sub }>{ recipeInfo.servings } servings</Text>
            <Text style={[ s.sub, s.yellow ]}>|</Text>
            <Text style={ s.sub }>{ recipeInfo.nutrition?.nutrients?.find(( item: any ) => item.name === "Calories" )?.amount } kcal</Text>
          </View>

          <Spacer size={ 20 } />

          <View style={ s.section }>
            <View style={ s.sectionContainer }>
              <Image 
                resizeMode="cover"
                source={ require( "../../assets/images/icons/warning.png" ) }
                style={ s.icon }
              />

              <Text style={ s.sectionHeading }>Important Notes</Text>
            </View>

            <View style={[ s.sectionContent, { flexDirection: "row", gap: 10 } ]}>
              { recipeInfo.vegetarian || recipeInfo.vegan || recipeInfo.glutenFree || recipeInfo.dairyFree || recipeInfo.lowFodmap || recipeInfo.cheap || recipeInfo.veryHealthy || recipeInfo.sustainable ?
                <Fragment>
                  { recipeInfo.vegetarian && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Vegetarian</Text>
                    </View> 
                  }
                  { recipeInfo.vegan && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Vegan</Text>
                    </View> 
                  }
                  { recipeInfo.glutenFree && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Gluten Free</Text>
                    </View> 
                  }
                  { recipeInfo.dairyFree && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Dairy Free</Text>
                    </View> 
                  }
                  { recipeInfo.lowFodmap && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Low FODMAP</Text>
                    </View> 
                  }
                  { recipeInfo.cheap && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Cheap</Text>
                    </View> 
                  }
                  { recipeInfo.veryHealthy && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Very Healthy</Text>
                    </View> 
                  }
                  { recipeInfo.sustainable && 
                    <View style={ s.box }>
                      <Text style={ s.boxText }>Sustainable</Text>
                    </View> 
                  }
                </Fragment>
                :
                <View style={ s.box }>
                  <Text style={ s.boxText }>Nothing important...</Text>
                </View> 
              }
            </View>
          </View>

          <Spacer size={ 20 } />

          <View style={ s.section }>
            <View style={ s.sectionContainer }>
              <Image 
                resizeMode="cover"
                source={ require( "../../assets/images/icons/ingredients.png" ) }
                style={ s.icon }
              />

              <Text style={ s.sectionHeading }>Ingredients List</Text>
            </View>

            <View style={[ s.sectionContent, { gap: 5, flexWrap: "nowrap" } ]}>
              {
                displayIngre ?
                displayIngre.map(( name: string, index: number ) => (
                  <Text key={ index } style={[ s.boxText, { color: LightMode.black, fontSize: 16, textTransform: "capitalize" } ]}>• { name }</Text>
                ))
                :
                <Text style={[ s.boxText, { color: LightMode.black, fontSize: 16, textTransform: "capitalize" } ]}>• No ingredients list available</Text>
              }
            </View>
          </View>

          <Spacer size={ 20 } />

          <View style={ s.section }>
            <View style={ s.sectionContainer }>
              <Image 
                resizeMode="cover"
                source={ require( "../../assets/images/icons/recipe.png" ) }
                style={ s.icon }
              />

              <Text style={ s.sectionHeading }>Guiding Steps</Text>
            </View>

            <View style={[ s.sectionContent, { gap: 15, flexWrap: "nowrap" } ]}>
              {
                displaySteps ?
                displaySteps.map(( name: string, index: number ) => (
                  <Text key={ index } style={[ s.boxText, { color: LightMode.black, fontSize: 16 } ]}>{ index + 1 }. { name }</Text>
                ))
                :
                <Text style={[ s.boxText, { color: LightMode.black, fontSize: 16 } ]}>• No steps available</Text>
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
            onPress={ () => navigation.navigate( "RecipeNarration", { recipeSteps: displaySteps } ) }
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
        openDrop={ openDrop }
        dropValue={ dropValue }
        dropItems={ dropItems }
        setOpenDrop={ setOpenDrop }
        setDropValue={ setDropValue }
        save={ () => {
          console.log( "Save to Tracker" )
          console.log( dropValue )
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