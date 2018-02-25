import React from 'react'
import { TextInput, View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Touchable } from '../touchable'

import { Metrics, Colors } from '../../../../constants/index'

import { styles } from '../styles/input.styles'

export class Input extends React.Component {

  static propTypes = {
    onIconPress: PropTypes.func,
    primaryIcon: PropTypes.string,
    secondaryIcon: PropTypes.string,
    setValue: PropTypes.func,
  };

  static defaultProps = {
    onIconPress: () => { },
    primaryIcon: '',
    secondaryIcon: '',
    setValue: () => { },
  };

  focus = () => {
    this.textInput.focus()
  };
  blur = () => {
    this.textInput.blur()
  };

  render() {
    const { primaryIcon, secondaryIcon, setValue, onIconPress } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.focus}>
        <View style={styles.container}>
          {
            primaryIcon !== '' &&
            <Icon
              color={Colors.blackSecondary}
              name={primaryIcon}
              size={Metrics.icons.medium}
              style={styles.icon}
            />
          }
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => setValue(value)}
            ref={(input) => { this.textInput = input }}
            selectionColor={Colors.primary}
            style={styles.inputText}
            underlineColorAndroid="transparent"
            {...this.props}
          />
          {
            secondaryIcon !== '' &&
            <Touchable borderless onPress={onIconPress} style={styles.iconWrap}>
              <Icon
                color={Colors.blackSecondary}
                name={secondaryIcon}
                size={Metrics.icons.medium}
                style={styles.icon}
              />
            </Touchable>
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
