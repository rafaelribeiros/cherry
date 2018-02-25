import React from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'


export const LoadingSpinner = (props) => {
  const { spinnerColor, spinnerSize } = props
  return (
    <ActivityIndicator color={spinnerColor} size={spinnerSize} />
  )
}

LoadingSpinner.propTypes = {
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.string
}

LoadingSpinner.defaultProps = {
  spinnerColor: null,
  spinnerSize: 'large'
}
