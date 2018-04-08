import React, { Component } from 'react'
import { TextInput, StyleSheet, ViewPropTypes } from 'react-native'
import { func } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'

import { Touchable } from '../touchable'

import { styles } from '../styles/rows.styles'
import { Colors, Metrics } from '../../../../constants'

export class RowSearch extends Component {
  static propTypes = {
    onValueUpdate: func,
    wrapStyle: ViewPropTypes.style
  }
  static defaultProps = {
    onValueUpdate: () => { },
    wrapStyle: {}
  }

  inputRef = React.createRef()
  state = { value: '' }

  updateValue = (value) => {
    this.setState({ value })
  }
  resetValue = () => {
    this.props.onValueUpdate('')
    this.setState({ value: '' })
    this.blur()
  }
  focus = () => this.inputRef.value.focus()
  blur = () => this.inputRef.value.blur()
  searchCandidate = _.debounce((value) => {
    this.props.onValueUpdate(value)
  }, 400)

  wrapStyle = () => (
    StyleSheet.flatten([
      styles.wrap,
      styles.wrapSmallIndent,
      this.props.wrapStyle
    ])
  )

  render() {
    return (
      <Touchable activeOpacity={0} style={this.wrapStyle()} onPress={this.focus}>
        <Icon
          name="magnify"
          color={Colors.blackDisabledAlt}
          size={Metrics.icons.small}
          style={styles.iconDense}
        />
        <TextInput
          ref={this.inputRef}
          value={this.state.value}
          style={styles.input}
          onChangeText={(value) => {
            this.updateValue(value)
            this.searchCandidate(value)
          }}
          selectionColor={Colors.primary}
          placeholder="Pesquisar"
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.blackDisabledAlt2}
        />
        {
          this.state.value !== '' &&
          <Touchable borderless onPress={this.resetValue}>
            <Icon
              name="close"
              color={Colors.blackSecondaryAlt}
              size={Metrics.icons.medium}
              style={styles.iconDense}
            />
          </Touchable>
        }
      </Touchable>
    )
  }
}
