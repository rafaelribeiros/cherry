import React from 'react'
import { TouchableWithoutFeedback, Modal, View, Text, ScrollView } from 'react-native'
import { bool, func, shape, string, arrayOf } from 'prop-types'

import { Touchable } from '../touchable'

import { styles } from '../styles/modal.styles'

const buildButton = ({ _id, label, onSelect }) => (
  <Touchable key={_id} onPress={() => onSelect({ _id, label })}>
    <Text style={styles.menu}>{label}</Text>
  </Touchable>
)

buildButton.propTypes = {
  label: string.isRequired,
  _id: string,
  onSelect: func,
}

buildButton.defaultProps = {
  _id: undefined,
  onSelect: () => {},
}


export const ModalSelect = ({
  visible, onCancelPress, onSelect, list
}) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={onCancelPress}
    transparent
  >
    <TouchableWithoutFeedback onPress={onCancelPress}>
      <View style={styles.background}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <ScrollView>
              {list.map(item => buildButton({ ...item, onSelect }))}
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)
ModalSelect.propTypes = {
  visible: bool.isRequired,
  list: arrayOf(shape({
    _id: string,
    label: string,
  })),
  onCancelPress: func,
  onSelect: func,
}

ModalSelect.defaultProps = {
  list: [{
    _id: undefined,
    label: undefined,
  }],
  onCancelPress: () => {},
  onSelect: () => {},
}
