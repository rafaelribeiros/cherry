import { Platform, StyleSheet } from 'react-native'
// import { measure, iconSize } from '../constants.styles'
import { Colors, Metrics, Images } from '../../../../constants'

export const crmCardImage = Images.documentRequest
// export const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     paddingTop: Metrics.tinySpacing,
//   },
//   headerContainer: {
//     backgroundColor: Colors.primary,
//     aspectRatio: 16 / 9,
//     justifyContent: 'flex-end',
//   },
//   headerTouch: {
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   headerTextWrap: {
//     flex: 1,
//     flexDirection: 'column',
//     paddingLeft: 16,
//   },
//   menuRowsWrap: {
//     paddingVertical: measure.oneModule,
//     backgroundColor: Colors.whitePrimary,
//     ...Platform.select({
//       android: { elevation: 2 },
//       ios: {
//         shadowColor: Colors.blackPrimary,
//         shadowOpacity: 0.26,
//         shadowRadius: 1,
//         shadowOffset: { width: 0, height: 1 },
//       }
//     })
//   },
//   menuRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   iconWrap: {
//     height: measure.rowWithIconHeight,
//     width: measure.rowWithIconHeight,
//     marginLeft: measure.oneModule * 2,
//     justifyContent: 'center',
//   },
//   iconSize: {
//     aspectRatio: 1,
//     width: iconSize.medium,
//     textAlign: 'center',
//   },
//   alertSectionContainer: {
//     backgroundColor: Colors.whitePrimary,
//     ...Platform.select({
//       android: { elevation: 2 },
//       ios: {
//         shadowColor: Colors.blackPrimary,
//         shadowOpacity: 0.26,
//         shadowRadius: 1,
//         shadowOffset: { width: 0, height: 1 },
//       }
//     })
//   },
//   alertSection: {
//     marginTop: Metrics.tinySpacing * 1.5,
//     marginBottom: Metrics.tinySpacing / 2,
//     marginHorizontal: Metrics.tinySpacing * 2,
//   },
//   alertLine: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     width: Metrics.tinySpacing / 2,
//     backgroundColor: Colors.alertPrimary
//   },
//   messageAlertText: {
//     textAlign: 'center',
//     color: Colors.blackSecondary,
//   },
//   alertButton: {
//     textAlign: 'center',
//     color: Colors.alertPrimary,
//     fontWeight: '500',
//     marginBottom: Metrics.tinySpacing,
//   },
//   versionRow: {
//     position: 'absolute',
//     right: 8,
//     bottom: 8,
//     color: Colors.blackDisabledAlt,
//     textAlign: 'right',
//     fontSize: 12,
//     backgroundColor: 'transparent',
//   },
//   menuItemButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: measure.rowWithIconHeight,
//     paddingHorizontal: measure.oneModule * 2,
//   },
//   menuIcon: {
//     width: Metrics.tinySpacing * 3,
//     height: Metrics.tinySpacing * 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: Metrics.tinySpacing * 4
//   },
//   menuBadge: {
//     backgroundColor: Colors.bluePrimary,
//     width: Metrics.tinySpacing,
//     height: Metrics.tinySpacing,
//     borderRadius: Metrics.tinySpacing / 2,
//     marginLeft: Metrics.tinySpacing / 2
//   },
//   menuTextContainer: {
//     flex: 1,
//     justifyContent: 'center'
//   },
//   menuItemTitle: {
//     color: Colors.blackPrimary
//   },
//   menuItemSubtitle: {
//     color: Colors.blackSecondary
//   },
// })
export const verifyAccount = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.special
  },
  top: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 24
  },
  subTitle: {
    color: 'white',
    fontSize: 14
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    padding: '4%'
  },
  footerTextContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
    flex: 1
  },
  imageContainer: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  mainImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  roundButtonContainer: {
    flex: 0.8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
