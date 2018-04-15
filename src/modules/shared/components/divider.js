import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { Colors, Metrics } from '../../../constants'

export const Divider = (props) => {
  const {
    bottomInset,
    leftInset,
    noMargin,
    rightInset,
    topInset,
    vertical,
  } = props

  const dividerStyle = vertical
    ? {
      marginBottom: bottomInset,
      marginHorizontal: (noMargin) ? 0 : Metrics.tinySpacing,
      marginTop: topInset,
      width: 1,
    } : {
      height: 1,
      marginLeft: leftInset,
      marginRight: rightInset,
      marginVertical: (noMargin) ? 0 : Metrics.tinySpacing,
    }
  return (
    <View
      style={[
        dividerStyle,
        { backgroundColor: Colors.darkDivider },
      ]}
    />
  )
}

Divider.propTypes = {
  leftInset: PropTypes.number,
  topInset: PropTypes.number,
  bottomInset: PropTypes.number,
  light: PropTypes.bool,
  noMargin: PropTypes.bool,
  rightInset: PropTypes.number,
  vertical: PropTypes.bool,
}

Divider.defaultProps = {
  leftInset: 0,
  topInset: 0,
  bottomInset: 0,
  light: false,
  noMargin: false,
  rightInset: 0,
  vertical: false,
}
