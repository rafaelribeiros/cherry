import React from 'react'
import { TouchableWithoutFeedback, Modal, View, Text } from 'react-native'
import { bool, func, shape, string, arrayOf } from 'prop-types'

import { Touchable } from '../touchable'

import { styles } from '../styles/modal.styles'

const buildButton = ({ label, onPress }) => (
  <Touchable key={label} onPress={onPress}>
    <Text style={styles.menu}>{label}</Text>
  </Touchable>
)
buildButton.propTypes = {
  label: string.isRequired,
  onPress: func.isRequired,
}

export const MenuModal = ({ visible, onCancelPress, buttons }) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={onCancelPress}
    transparent
  >
    <TouchableWithoutFeedback onPress={onCancelPress}>
      <View style={styles.background}>
        <View style={styles.card}>
          {buttons.map(buildButton)}
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)
MenuModal.propTypes = {
  visible: bool.isRequired,
  onCancelPress: func.isRequired,
  buttons: arrayOf(shape({
    label: string,
    onPress: func,
  })).isRequired
}
