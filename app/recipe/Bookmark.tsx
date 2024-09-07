import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import EmptyContent from 'components/EmptyContent'
import HoriCardWithCTA from 'components/HoriCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forRecipeManager } from 'data/dummyData'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookmark, fetchBookmarkInfo } from 'redux/actions/userAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function Bookmark() {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const [ search, setSearch ] = useState( "" )
  const [ refreshing, setRefreshing ] = useState( false )

  const filteredRecipes = data[ 0 ]?.bookmarkedRecipes?.filter(
    ( item: any ) => item.title.toLowerCase().includes( search.toLowerCase() )
  ) || []

  const SearchItem = ( { item, index }: any ) => (
    <HoriCardWithCTA 
      key={ index }
      onPress={ () => navigation.navigate( "RecipeDetail", { recipeId: item.id, inBookmark: true } ) }
      data={ item }
    />
  )

  // Refresh twice to see result, redux state issues
  const onRefresh = async () => {
    setRefreshing( true )

    if ( userSession ) {
      await dispatch( fetchBookmark( userSession.userId ) )

      const theRecipeIds = data[ 0 ].fetchBookmarks.map(
        ( item: any ) => item.recipeId
      ).join( "," )

      await dispatch( fetchBookmarkInfo( theRecipeIds ) )
    }

    setRefreshing( false )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    const getUserSession = async () => {
      const theUserSession = await AsyncStorage.getItem( "@user_session" )

      if ( theUserSession !== null ) {
        const parsed = JSON.parse( theUserSession )

        setUserSession( parsed )
      }
    } 

    getUserSession()
  }, [])

  useEffect(() => {
    if ( userSession && !data[ 0 ].fetchBookmarks && !data[ 0 ].bookmarkedRecipes ) {
      dispatch( fetchBookmark( userSession.userId ) )
    }
  }, [ userSession ])

  useEffect(() => {
    if ( data[ 0 ].fetchBookmarks && !data[ 0 ].bookmarkedRecipes ) {  
      const theRecipeIds = data[ 0 ].fetchBookmarks.map(
        ( item: any ) => item.recipeId
      ).join( "," )

      dispatch( fetchBookmarkInfo( theRecipeIds ) )
    }
  }, [ data ])
  
  return (
    loading ? <Loading /> : 
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Bookmarks</Text>

        <Spacer size={ 10 } />

        <LinedTextField 
          name="search"
          placeholder="Search Bookmarks..."
          text={ search }
          setText={ setSearch }
        />

        <Spacer size={ 30 } />

        {
          data && data.length > 0 && data[ 0 ].fetchBookmarks && data[ 0 ].bookmarkedRecipes ?
            <FlatList
              refreshing={ refreshing }
              onRefresh={ onRefresh }
              style={{ margin: -20 }}
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={ false }
              data={ filteredRecipes }
              renderItem={ SearchItem }
              keyExtractor={ data => data.id.toString() }
              ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
              ListEmptyComponent={ () => (
                <EmptyContent 
                  message="No bookmarks found..."
                />
              )}
            />
          :
            <EmptyContent 
              message="Unable to fetch API..."
            />
        }
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
})