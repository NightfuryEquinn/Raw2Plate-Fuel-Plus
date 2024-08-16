import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import React from 'react'
import { ImageSourcePropType, StyleSheet } from 'react-native'
import { Circle, G, Image } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'

export default function TrackerPieChart( { carbs, proteins, fibers, fats }: any ) {
  const interpolateColor = ( first: string, second: string, factor: number ) => {
    const result = first.slice( 1 ).match( /.{2}/g )?.map(( hex, index ) => {
      return Math.round(
        parseInt( hex, 16 ) + factor * ( parseInt( second.slice( 1 ).match( /.{2}/g )!![ index ], 16 ) - parseInt( hex, 16 ))
      )
    })

    return `#${ result?.map(( value ) => value.toString( 16 ).padStart( 2, '0' ) ).join( '' ) }`
  }

  const randomColor = ( factor: number ) => {
    return interpolateColor( "#142850", "#136F63", factor * 0.5 )
  }

  const iconsArr: ImageSourcePropType[] = [
    require( "../assets/images/carbs.png" ),
    require( "../assets/images/proteins.png" ),
    require( "../assets/images/fibers.png" ),
    require( "../assets/images/fats.png" ),
  ]
  
  const chartData = [ carbs, proteins, fibers, fats ]
  .filter( value => value > 0 )
  .map(( amount: number, index: number ) => ({
    amount,
    svg: { fill: randomColor( index ) },
    key: `chart-${ index }`
  }))

  const Labels = ({ slices, height, width }: any ) => {
    return slices.map(( slice: any, index: number ) => {
      const { labelCentroid, pieCentroid, data } = slice

      return (
        <G
          key={ index }
          x={ labelCentroid[ 0 ] }
          y={ labelCentroid[ 1 ] }
        >
          <Circle 
            r={ 24 }
            fill={ LightMode.white }
          />

          <Image
            x={ -14.25 }
            y={ -14.25 }
            width={ 28 }
            height={ 28 }
            preserveAspectRatio="xMidYMid slice"
            opacity={ 1 }
            href={ iconsArr[ index ] }
          />
        </G>
      )
    })
  }

  return (
    <PieChart
      style={ s.chart }
      valueAccessor={( { item }: any ) => item.amount }
      data={ chartData }
      outerRadius="95%"
    >
      <Labels />
    </PieChart>
  )
}

const s = StyleSheet.create({
  "chart": {
    height: 300
  }
})

TrackerPieChart.propTypes = {
  carbs: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fibers: PropTypes.number.isRequired,
  fats: PropTypes.number.isRequired,
}