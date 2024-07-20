import { fetchFailure, fetchStart, fetchSuccess } from 'actions/fetchAction';
import { useFontFromContext } from 'context/FontProvider';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'reducers/store';
import { fetchData } from 'services/fetchServices';

export default function App() {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.fetch )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    const fetchFromApi = async () => {
      dispatch( fetchStart() )

      try {
        const result = await fetchData()
        dispatch( fetchSuccess( result ))
      } catch ( error: any ) {
        dispatch( fetchFailure( error.message ))
      }
    }

    fetchFromApi()
  }, [])

  return (
    <View style={ styles.container }>
      { loading ?
        <Text style={ styles.text }>Loading</Text>
        : error ?
        <Text style={ styles.text }>Error: { error }</Text>
        : 
        <Text style={ styles.text }>Done!</Text>
      }

      { data.map(( item ) => (
        <Text key={0} style={ styles.sub }>{ item.fact }</Text>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  "container": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  "text": {
    fontFamily: "fjalla"
  },
  "sub": {
    fontFamily: "cantarell"
  }
})

