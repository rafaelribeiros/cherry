import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles/cameraRoundButton.style'
import { Colors } from '../../../constants'

class CameraRoundButton extends Component {
  state ={}
  render() {
    const { onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.roundButton}>
        <Icon name="photo-camera" size={40} color={Colors.blackPrimary} />
      </TouchableOpacity>
    )

  }
}

CameraRoundButton.propTypes = {
  onPress: PropTypes.func
}

CameraRoundButton.defaultProps = {
  onPress: () => {}
}

export default CameraRoundButton
