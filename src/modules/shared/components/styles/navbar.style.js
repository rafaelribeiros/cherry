import { StyleSheet, Platform } from 'react-native';

import { Colors, Metrics } from '../../../../constants';

export const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    paddingTop: Metrics.statusBarHeight,
  },
  titleMain: {
    color: Colors.white,
    flex: 1,
    marginHorizontal: Metrics.section,
  },
  title: {
    color: Colors.white,
    flex: 1,
    marginHorizontal: Metrics.smallSpacing,
    fontSize: 20,
    ...Platform.select({ ios: { fontWeight: '600' } }),
    textAlign: (Platform.OS === 'ios') ? 'center' : 'left',
  },
  buttonGroupWrap: {
    marginRight: Metrics.smallSpacing,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: Metrics.navBarButtonHeight,
    aspectRatio: 1
  },
  iosBackButtonAlignment: {
    backgroundColor: 'transparent',
    right: Metrics.baseMargin
  }
});
