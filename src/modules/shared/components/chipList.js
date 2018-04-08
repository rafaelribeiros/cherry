import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'

import { Metrics } from '../../../constants'
import { Chip } from './chip'

const CHIP_EDGE_SPACE = Metrics.largeSpacing - (Metrics.smallSpacing / 2)

export class ChipList extends Component {
  static propTypes = {
    chips: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      onPress: PropTypes.func,
    })),
    onPressChip: PropTypes.func,
  }
  static defaultProps = {
    chips: [],
    onPressChip: () => {},
  }

  state = { selectedIndex: 0 }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.selectedIndex === prevState.selectedIndex) return null
    return { selectedIndex: nextProps.selectedIndex }
  }

  renderChips = ({ item, index }) => {
    const { onPressChip } = this.props
    const { selectedIndex } = this.state
    return (
      <Chip
        label={item.label}
        onPress={() => this.selectChip(onPressChip, index)}
        selected={selectedIndex === index}
      />
    )
  }

  selectChip = (onPressChip, index) => {
    onPressChip(index)
    this.flatListRef.scrollToIndex({
      animated: true,
      index,
      viewOffset: CHIP_EDGE_SPACE
    })
  }

  spacing = () => <View style={{ width: CHIP_EDGE_SPACE }} />

  render() {
    const { chips } = this.props
    return (
      <FlatList
        extraData={this.state}
        ref={(ref) => { this.flatListRef = ref }}
        horizontal
        ListHeaderComponent={this.spacing}
        renderItem={this.renderChips}
        ListFooterComponent={this.spacing}
        data={chips}
        showsHorizontalScrollIndicator={false}
      />
    )
  }
}
