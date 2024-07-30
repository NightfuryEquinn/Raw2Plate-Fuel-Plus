import { useFontFromContext } from 'context/FontProvider';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFailure, fetchStart, fetchSuccess } from 'redux/actions/fetchAction';
import { AppDispatch, RootState } from 'redux/reducers/store';
import { fetchData } from 'redux/services/fetchServices';
import Loading from './Loading';

export default function Main() {
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
    <View style={ s.container }>
      { loading ?
        <Loading />
        : error ?
        <Text style={ s.text }>Error: { error }</Text>
        : 
        <Text style={ s.text }>Done!</Text>
      }

      { data.map(( item ) => (
        <Text key={0} style={ s.sub }>{ item.fact }</Text>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
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

