import { LightMode } from 'assets/colors/LightMode'
import AbsoluteIcon from 'components/AbsoluteIcon'
import FilterGroceryCategoryModal from 'components/FilterGroceryCategoryModal'
import GroceryCard from 'components/GroceryCard'
import LinedTextField from 'components/LinedTextField'
import SingleGroceryCardModal from 'components/SingleGroceryCardModal'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forInCart } from 'data/dummyData'
import { GroceryItemCategory, groceryItemCategory } from 'data/groceryItemCategory'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'

const IMG_HEIGHT = 200

export default function InStore( { navigation, route }: any ) {
  const { storeData } = route.params

  const [ search, setSearch ] = useState( "" )
  const [ category, setCategory ] = useState( "" )
  const [ quantity, setQuantity ] = useState( 1 )

  const [ modal, setModal ] = useState( false )

  const [ singleData, setSingleData ] = useState( [] )
  const [ singleModal, setSingleModal ] = useState( false )

  const filteredItems = groceryItemCategory.filter( data => 
    data.name.toLowerCase().includes( search.toLowerCase() )
  ).filter( data => 
    category === "" || data.category.toLowerCase() === category.toLowerCase()
  )

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset( scrollRef )

  const showModal = () => {
    setModal( !modal )
  }

  const showCategory = ( theCategory: string ) => {
    setCategory( theCategory )
  }

  const showSingleModal = ( theSingleData: any ) => {
    setSingleModal( !singleModal )
    setSingleData( theSingleData )
  }

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [ -IMG_HEIGHT, 0, IMG_HEIGHT ],
            [ -IMG_HEIGHT / 2, 0, IMG_HEIGHT * 1.25 ]
          )
        },
        { scale: interpolate(
            scrollOffset.value,
            [ -IMG_HEIGHT, 0, IMG_HEIGHT ],
            [ 2, 1, 1 ],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollOffset.value,
        [ 0, IMG_HEIGHT ],
        [ 0, 35 ],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(
        scrollOffset.value,
        [ 0, IMG_HEIGHT ],
        [ 0, 1 ]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [ 0, IMG_HEIGHT ],
            [ -35, 0 ],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <View style={ s.parallaxContainer }>
          <View style={ s.searchContainer }>
            <View style={ s.searchWrapper }>
              <LinedTextField 
                name="search"
                placeholder="Search in Store..."
                text={ search }
                setText={ setSearch }
              />
            </View>
            
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showModal }
              style={ s.icon }
            >
              <IconMA 
                name="filter-alt"
                size={ 24 }
                color={ LightMode.white }
              />
            </TouchableOpacity>
          </View>

          <Spacer size={ 10 } />

          <Animated.View style={ headerAnimatedStyle }>
            <Text style={ s.heading }>{ storeData.store }</Text>
          </Animated.View>

          <Spacer size={ 10 } />

          <Animated.ScrollView
            ref={ scrollRef }
            scrollEventThrottle={ 16 }
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={{ paddingHorizontal: 20 }}
            style={ s.scroll }
          >
            <Animated.Image 
              resizeMode="cover"
              source={ storeData.image }
              style={[ s.image, imageAnimatedStyle ]}
            />

            <View style={ s.itemContainer }>
              { 
                filteredItems.length !== 0 ? (
                  filteredItems.map(( data: GroceryItemCategory, index: number ) => (
                    <GroceryCard
                      key={ index }
                      data={ data }
                      onPress={ () => showSingleModal( data ) }
                    />
                  ))
                )  
                :
                <View style={ s.emptyContainer }>
                  <Image 
                    source={ require( "../../assets/images/icons/cancel.png" ) }
                    resizeMode="cover"
                    style={ s.emptyIcon }
                  />

                  <Text style={ s.emptyText }>No products of this category available in this store...</Text>
                </View>
              }
            </View>
          </Animated.ScrollView>
        </View>
      </View>

      <AbsoluteIcon 
        name="shopping-cart"
        onPress={ () => navigation.navigate( "InCart", { theCart: forInCart[ 1 ] } ) }
      />

      <FilterGroceryCategoryModal 
        modal={ modal }
        showModal={ showModal }
        category={ category }
        showCategory={ showCategory }
      />

      <SingleGroceryCardModal
        data={ singleData }
        modal={ singleModal }
        showModal={ () => {
          showSingleModal( singleData )
          setQuantity( 1 )
        }}
        quantity={ quantity }
        setQuantity={ setQuantity }
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
  "parallaxContainer": {
    flex: 1,
  },
  "scroll": {
    marginHorizontal: -20,
  },
  "image": {
    width: "auto",
    height: IMG_HEIGHT,
    borderRadius: 10,
  },
  "searchContainer": {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  "searchWrapper": {
    flex: 1,
  },
  "icon": {
    padding: 10,
    backgroundColor: LightMode.black,
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
  "itemContainer": {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 30,
    rowGap: 20,
    backgroundColor: LightMode.white
  },
  "emptyContainer": {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: LightMode.darkGrey,
    borderRadius: 10
  },
  "emptyIcon": {
    height: 44,
    width: 44
  },
  "emptyText": {
    paddingHorizontal: 20,
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black,
    textAlign: "center"
  }
})