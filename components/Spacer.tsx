import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

export default function Spacer( { horizontal = false, size }: any ) {
  const defaultValue = "auto"
  
  return (
    <View style={{
      width: horizontal ? size: defaultValue,
      height: !horizontal ? size: defaultValue
    }} />
  )
}

Spacer.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  horizontal: PropTypes.bool,
}