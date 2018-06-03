import React from 'react'
import { Picker, View, Text } from 'react-native'
import { array, string, func, bool } from 'prop-types'

import { styles } from './styles/customPicker.style'

export const CustomPicker = ({
  changeValue,
  selectedValue,
  values,
  label,
  hasLabel,
}) => {
  const labelUppercase = hasLabel ? label.toUpperCase() : ''
  return (
    <View style={styles.container}>
      {hasLabel && <Text style={styles.labelStyle}>{labelUppercase}</Text>}
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={itemValue => changeValue(itemValue)}
      >
        <Picker.Item label={label} value="" />
        {
          values.map(item => <Picker.Item label={item} value={item} key={item} />)
        }
      </Picker >
    </View>
  )
}

CustomPicker.defaultProps = {
  selectedValue: '',
  values: [],
  label: 'Selecione',
  changeValue: () => { },
  hasLabel: false,
}
CustomPicker.propTypes = {
  selectedValue: string,
  values: array,
  label: string,
  changeValue: func,
  hasLabel: bool,
}
