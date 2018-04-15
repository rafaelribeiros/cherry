import React from 'react'
import { Modal, FlatList, StyleSheet, Text, View } from 'react-native'
import { arrayOf, bool, func, string } from 'prop-types'

import { BackButtonFloating } from '../backButtonFloating'
import { ScreenContainerHOC } from '../hoc/screenContainerHOC'
import { Metrics, Fonts, Colors } from '../../../../constants'

const Container = ScreenContainerHOC(View)

const renderParagraph = paragraph => <Text style={styles.paragraph}>{paragraph}</Text>
const Spacing = () => <View style={styles.spacing} />

export const ModalParagraphsFullScreen = ({
  isVisible, onClosePress, title, subtitle, paragraphs
}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={isVisible}
  >
    <Container>
      <View style={styles.navBar}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <FlatList
        data={paragraphs}
        ListHeaderComponent={<Spacing />}
        renderItem={({ item }) => renderParagraph(item)}
        ListFooterComponent={<Spacing />}
      />
      <BackButtonFloating androidNavbarFix onPress={onClosePress} />
    </Container>
  </Modal>
)
ModalParagraphsFullScreen.propTypes = {
  isVisible: bool.isRequired,
  onClosePress: func.isRequired,
  title: string,
  subtitle: string,
  paragraphs: arrayOf(string),
}
ModalParagraphsFullScreen.defaultProps = {
  title: '',
  subtitle: '',
  paragraphs: [],
}

const styles = StyleSheet.create({
  navBar: {
    alignItems: 'center',
    height: Metrics.navBarDataHeight,
    justifyContent: 'center',
  },
  listWrap: {
    marginVertical: Metrics.standardSpacing
  },
  title: {
    ...Fonts.style.heavyDescription,
    color: Colors.blackPrimaryAlt
  },
  subtitle: {
    ...Fonts.style.footnote,
    color: Colors.primary
  },
  paragraph: {
    ...Fonts.style.normal,
    marginHorizontal: Metrics.standardSpacing,
    marginBottom: Metrics.standardSpacing,
    color: Colors.blackPrimaryAlt
  },
  spacing: {
    height: Metrics.standardSpacing
  }
})
