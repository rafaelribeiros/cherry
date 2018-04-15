import { Platform, StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../../constants'

const {
  blackPrimary,
  blackSecondary,
  darkDivider,
  primary,
  screen,
  white,
} = Colors

const {
  avatar,
  borderWidth,
  icons,
  largeSpacing,
  smallSpacing,
  standardSpacing,
  statusBarHeight,
  tinySpacing,
} = Metrics

const halfAvatarSize = avatar.xxl / 2

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: screen
  },
  containerComplete: {
    flex: 1,
    backgroundColor: screen
  },
  alignTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  avatar: {
    zIndex: 2,
    elevation: 2,
    top: halfAvatarSize,
    alignSelf: 'center'
  },
  badge: {
    backgroundColor: primary,
    borderColor: white,
    borderRadius: icons.large / 2,
    borderWidth,
    bottom: 2,
    position: 'absolute',
    right: 2,
    width: icons.large,
  },
  cameraBadge: {
    borderColor: screen,
    borderRadius: icons.xl / 2,
    borderWidth,
    bottom: 0,
    position: 'absolute',
    right: 0,
    width: icons.xl,
  },
  nameCard: {
    paddingBottom: standardSpacing,
    marginBottom: 0,
    ...Platform.select({
      android: {
        borderBottomWidth: borderWidth,
        borderColor: darkDivider,
        elevation: 0,
        marginBottom: standardSpacing,
        paddingTop: halfAvatarSize,
      },
      ios: {
        paddingTop: halfAvatarSize + smallSpacing,
      }
    })
  },
  textUserName: {
    ...Fonts.style.h4,
    color: blackPrimary,
    marginHorizontal: largeSpacing,
    textAlign: 'center',
  },
  textUserEmail: {
    ...Fonts.style.footnote,
    color: blackSecondary,
    marginHorizontal: largeSpacing,
    textAlign: 'center',
  },
  textUserType: {
    ...Fonts.style.footnote,
    color: blackSecondary,
    marginHorizontal: largeSpacing,
    textAlign: 'center',
  },
  listFirstItem: {
    paddingTop: Metrics.tinySpacing,
  },
  listLastItem: {
    borderBottomWidth: Metrics.borderWidth,
    borderColor: Colors.darkDivider,
    paddingBottom: Metrics.tinySpacing,
  },
  borderBottom: {
    borderBottomWidth: Metrics.borderWidth,
    borderColor: Colors.darkDivider,
  },
  alignCenter: {
    alignSelf: 'center'
  },
  avatarWrap: {
    alignSelf: 'center',
    marginTop: largeSpacing,
  },
  inputWrap: {
    marginTop: largeSpacing,
    marginBottom: standardSpacing,
    paddingBottom: tinySpacing,
  },
  textFooter: {
    textAlign: 'center',
    marginVertical: tinySpacing,
    color: Colors.blackSecondaryAlt
  }
})
