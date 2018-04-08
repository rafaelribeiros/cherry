import React from 'react'
import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import { func, number, string } from 'prop-types'
import Hyperlink from 'react-native-hyperlink'
import { Colors, Fonts } from '../../../constants'

export const TextWithReadMore = ({
  children,
  maxLength = 140,
  onLinkPress,
  onPress,
  style,
}) => {
  const hasReadMore = (maxLength > 0 && children.length > maxLength)
  const textToShow = (hasReadMore) ? children.substring(0, maxLength).concat('... ') : children
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {hasReadMore ?
        <View>
          <Text style={style}>
            {textToShow}
            {hasReadMore && <Text style={styles.readMore}>ler mais</Text>}
          </Text>
        </View> :
        <Hyperlink linkStyle={{ color: Colors.primary }} onPress={url => onLinkPress(url)}>
          <View>
            <Text style={style}>
              {textToShow}
            </Text>
          </View>
        </Hyperlink>
      }
    </TouchableWithoutFeedback>
  )
}

TextWithReadMore.defaultProps = {
  maxLength: 180,
  onPress: () => { },
  onLinkPress: () => { },
  style: {}
}
TextWithReadMore.propTypes = {
  maxLength: number,
  onPress: func,
  onLinkPress: func,
  style: Text.propTypes.style,
  children: string.isRequired,
}

const styles = StyleSheet.create({
  readMore: {
    color: Colors.primary,
    ...Fonts.type.medium,
  }
})
