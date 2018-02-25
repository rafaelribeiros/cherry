import React from 'react'
import { Picker, View } from 'react-native'
import { array, string, func } from 'prop-types'

import { styles } from './styles/customPicker.style'

export const CustomPicker = ({
  changeValue,
  selectedValue,
  values,
  label,
}) => {
  return (
    <View style={styles.container}>
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
}
CustomPicker.propTypes = {
  selectedValue: string,
  values: array,
  label: string,
  changeValue: func,
}
