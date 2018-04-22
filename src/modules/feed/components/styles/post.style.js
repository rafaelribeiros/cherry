import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screen,
  },
  titleRowWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.darkDivider,
    minHeight: Metrics.buttonHeightDense,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.footnote,
    color: Colors.blackSecondary,
    flex: 1,
    marginLeft: Metrics.standardSpacing,
  },
  selectorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Metrics.tinySpacing / 2,
  },
  selectorTitle: {
    ...Fonts.style.footnote,
    color: Colors.blackPrimary,
    paddingLeft: Metrics.standardSpacing,
  },
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.darkDivider,
  },
  avatarRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatarRowWithInset: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: Metrics.standardSpacing
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonNumber: {
    ...Fonts.style.footnote,
    color: Colors.blackSecondary,
    paddingLeft: Metrics.tinySpacing,
  },
  commentWithoutBottomMargin: {
    ...Fonts.style.description,
    color: Colors.blackPrimary,
    marginHorizontal: Metrics.standardSpacing,
  },
  comment: {
    ...Fonts.style.description,
    color: Colors.blackPrimary,
    marginHorizontal: Metrics.standardSpacing,
    marginBottom: Metrics.smallSpacing,
  },
  subComment: {
    ...Fonts.style.description,
    color: Colors.blackPrimary,
    marginRight: Metrics.standardSpacing,
    marginLeft: Metrics.standardSpacing * 2,
    marginBottom: Metrics.smallSpacing,
  },
  loadingContainer: {
    marginTop: Metrics.tinySpacing,
    flex: 0.1
  },
  loadMore: {
    alignItems: 'center',
    backgroundColor: Colors.screen,
    width: '100%',
    padding: Metrics.smallSpacing
  },
  loadMoreText: {
    color: Colors.blackSecondary,
  },
  loadSubCommentsRow: {
    backgroundColor: Colors.screen,
    paddingLeft: Metrics.standardSpacing
  }
})
