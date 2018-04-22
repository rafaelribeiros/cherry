import React from 'react'
import PropTypes from 'prop-types'
import { Picker, View, Text } from 'react-native'

import { styles } from '../styles/input.styles'
import { Colors } from '../../../../constants'

export const SelectWithLabel = ({
  label,
  onValueChange,
  placeholder,
  selectedValue,
  items
}) => {
  const labelUppercase = label.toUpperCase()
  return (
    <View style={styles.InputWithLabelContainer}>
      <Text style={styles.labelStyle}>{labelUppercase}</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ flex: 1 }}
        onValueChange={itemValue => onValueChange(itemValue)}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map(item => <Picker.Item key={item} label={item} value={item} />)}
      </Picker>
    </View>
  )
}

SelectWithLabel.propTypes = {
  onValueChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  items: PropTypes.array,
  selectedValue: PropTypes.string,
}

SelectWithLabel.defaultProps = {
  onValueChange: () => { },
  label: '',
  placeholder: '',
  items: [],
  selectedValue: '',
}
