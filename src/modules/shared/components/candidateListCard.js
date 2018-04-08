import React from 'react'
import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { FloatingCard } from './floatingCard'
import { RowCandidateSelectable } from './rows/rowCandidateSelectable'
import { RowSearch } from './rows'
import { Touchable } from './touchable'

import { styles } from './styles/candidateListCard.style'
import { candidatePropTypes } from '../propTypes/candidatePropTypes'
import { Divider } from './divider'
import { Metrics } from '../../../constants'

const renderSeparator = () => <Divider noMargin />
const extractKey = item => item.id

export const CandidateListCard = ({
  candidates,
  selectedCandidates,
  onPressCandidate,
  loadMore,
  onSearch,
  itemsEndReached,
}) => {
  const renderLoadMore = candidates.length > 0 && (itemsEndReached === false)
  return (
    <View style={{ width: Metrics.screenWidth }}>
      <FloatingCard style={styles.container}>
        <FlatList
          ListHeaderComponent={<RowSearch onValueUpdate={onSearch} wrapStyle={styles.topRadius} />}
          data={candidates}
          renderItem={({ item }) => (
            <RowCandidateSelectable
              id={item.id}
              title={item.name}
              subtitle={`${item.number} - ${item.party}`}
              selectedCandidates={selectedCandidates}
              onPress={onPressCandidate}
              image={item.image}
            />
          )}
          keyExtractor={extractKey}
          ItemSeparatorComponent={renderSeparator}
          stickyHeaderIndices={[0]}
          ListFooterComponent={
            (renderLoadMore) &&
            <Touchable style={styles.footerContainer} onPress={loadMore}>
              <Text style={styles.footerText}>Carregar mais</Text>
            </Touchable>
          }
          ListEmptyComponent={
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Não há itens a exibir</Text>
            </View>
          }
        />
      </FloatingCard>
    </View>
  )
}
CandidateListCard.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape(candidatePropTypes)),
  selectedCandidates: PropTypes.arrayOf(PropTypes.string),
  onPressCandidate: PropTypes.func,
  onSearch: PropTypes.func,
  loadMore: PropTypes.func,
  itemsEndReached: PropTypes.bool,
}
CandidateListCard.defaultProps = {
  candidates: [],
  selectedCandidates: [],
  onPressCandidate: () => { },
  onSearch: () => { },
  loadMore: () => { },
  itemsEndReached: false,
}
