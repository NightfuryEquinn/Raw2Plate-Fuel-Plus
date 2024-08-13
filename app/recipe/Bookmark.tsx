import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { LightMode } from 'assets/colors/LightMode'
import HoriCardWithCTA from 'components/HoriCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forRecipeManager } from 'data/dummyData'
import { mealCategories, MealCategory } from 'data/mealCategory'
import React, { useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function Bookmark() {
  const pagerView = useRef<any>()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const mode = [ "RECENT", "A-Z", "Z-A" ]

  const [ search, setSearch ] = useState( "" )
  const [ active, setActive ] = useState( 0 )
  const [ filterMode, setFilterMode ] = useState( 0 )

  const toggleFilterMode = () => {
    if ( mode.length - 1 === filterMode ) {
      setFilterMode( 0 )
    } else {
      setFilterMode( filterMode + 1 )
    }
  }

  const SearchItem = ( { item, index }: any ) => (
    <HoriCardWithCTA 
      onPress={ () => navigation.navigate( "RecipeDetail" ) }
      data={ item }
    />
  )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Bookmarks</Text>

        <Spacer size={ 10 } />

        <View style={ s.searchContainer }>
          <View style={ s.searchWrapper }>
            <LinedTextField 
              name="search"
              placeholder="Search Bookmarks..."
              text={ search }
              setText={ setSearch }
            />
          </View>
          
          <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ toggleFilterMode }
            style={ s.icon }
          >
            <IconMA 
              name="filter-list"
              size={ 24 }
              color={ LightMode.white }
            />

            <Text style={ s.iconFilter }>{ mode[ filterMode ] }</Text>
          </TouchableOpacity>
        </View>

        <Spacer size={ 10 } />

        <View>
          <ScrollView
            contentContainerStyle={{ padding: 20 }}
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
            style={ s.scroll }
          >
            {
              mealCategories.map(( meal: MealCategory, index: number ) => (
                <TouchableOpacity
                  key={ index }
                  activeOpacity={ 0.5 }
                  onPress={ () => {
                    setActive( index ) 
                    pagerView.current.setPage( index )
                  }}
                  style={[ 
                    s.pagerButton, 
                    active === index ? { backgroundColor: LightMode.green } : { backgroundColor: LightMode.white },
                    mealCategories.length - 1 !== index && { marginRight: 15 }
                  ]}
                >
                  <View style={ s.pagerWrapper }>
                    <Text style={ s.pagerText }>{ meal.label }</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>

        <Spacer size={ 40 } />

        <PagerView
          ref={ pagerView }
          initialPage={ active }
          scrollEnabled={ true }
          style={ s.pager }
          keyboardDismissMode="on-drag"
          onPageScroll={ ( e: any ) => setActive( e.nativeEvent.position ) }
        >
          {
            mealCategories.map(( meal: MealCategory, index: number ) => (
              <FlatList
                key={ index }
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator= { false }
                data={ forRecipeManager }
                renderItem={ SearchItem }
                keyExtractor={ data => data.id.toString() }
                ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
              />
            ))
          }
        </PagerView>
      </View>
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
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
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
  "iconFilter": {
    fontFamily: "cantarell",
    fontSize: 14,
    color: LightMode.white
  },
  "scroll": {
    margin: -20
  },
  "pagerButton": {
    height: 35,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "pagerWrapper": {
    flex: 1,
  },
  "pagerText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "pager": {
    flex: 1,
    margin: -20,
  }
})