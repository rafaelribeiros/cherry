import React from 'react'
import { ScrollView, Text, View, RefreshControl } from 'react-native'
import { func, bool, shape } from 'prop-types'

import { Avatar } from '../../shared/components/avatar'
import { Card } from '../../shared/components/card'
import { Icon } from '../../shared/components/icon'
import { IconButton } from '../../shared/components/iconButton'
import { RowMenuWithIcon } from '../../shared/components/rowMenuWithIcon'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'

import { Colors, Metrics } from '../../../constants'
import { styles } from './styles/profile.style'
import { ScreenContainerHOC } from '../../shared/components/hoc/screenContainerHOC'
import { userPropTypes } from '../../shared/propTypes/userPropTypes'

const buildMenu = menus => (
  menus.map(menu => (
    <RowMenuWithIcon
      icon={menu.icon}
      button={menu.button}
      containerStyle={menu.containerStyle}
      key={menu.title}
      onPress={menu.onPress}
      subtitle={menu.subtitle}
      title={menu.title}
    />
  ))
)

const setValuesToShow = (user) => {
  const { isAdmin, pageAdmin } = user
  if (isAdmin === true) {
    return {
      nameText: pageAdmin.name,
      imageUrl: pageAdmin.imageUrl,
      infoText: 'CANDIDATO'
    }
  }
  return {
    nameText: user.name,
    imageUrl: user.imageUrl,
    infoText: user.email
  }
}

const Container = ScreenContainerHOC(View)

export const Profile = ({
  logout,
  onEditProfilePress,
  onHelpPress,
  onInvitePress,
  onViewProfilePress,
  onEditAdminPress,
  onRateAppPress,
  user,
  loading,
  onRefresh,
  refreshing,
}) => {
  const { isAdmin } = user
  const adminMenuItems = [
    {
      button: { name: 'chevron-right' },
      title: 'Ver perfil',
      onPress: onViewProfilePress,
      containerStyle: styles.listFirstItem,
      icon: { name: 'account-circle' },
    },
    {
      button: { name: 'chevron-right' },
      title: 'Editar perfil',
      onPress: () => onEditProfilePress(true),
      icon: { name: 'pencil-circle' },
    },
    {
      button: { name: 'chevron-right' },
      title: 'Gerenciar administradores',
      onPress: onEditAdminPress,
      containerStyle: styles.listLastItem,
      icon: { name: 'star-circle' },
    },
    {
      title: 'Precisa de ajuda?',
      onPress: onHelpPress,
      containerStyle: [styles.listFirstItem, styles.listLastItem],
      icon: { name: 'help-circle' }
    }
  ]

  const userMenuItems = [
    {
      button: { name: 'chevron-right' },
      title: 'Editar perfil',
      onPress: () => onEditProfilePress(false),
      containerStyle: [styles.listFirstItem, styles.listLastItem],
      icon: { name: 'account-circle' }
    },
    {
      title: 'Convide um amigo',
      onPress: onInvitePress,
      containerStyle: styles.listFirstItem,
      icon: { name: 'share-variant' }
    },
    {
      title: 'Avaliar o app',
      onPress: onRateAppPress,
      icon: { name: 'heart' }
    },
    {
      title: 'Precisa de ajuda?',
      onPress: onHelpPress,
      containerStyle: styles.listLastItem,
      icon: { name: 'help-circle' }
    },
  ]

  const renderMenu = isAdmin
    ? buildMenu(adminMenuItems)
    : buildMenu(userMenuItems)

  const valuesToShow = setValuesToShow(user)
  const userTypeColor = { color: (isAdmin) ? Colors.primary : Colors.blackSecondary }
  return (
    <Container style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.primary]}
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={Colors.primary}
          />
        }
      >
        <View>
          <View style={styles.avatar}>
            <Avatar
              name={valuesToShow.nameText}
              size={Metrics.avatar.xxl}
              source={valuesToShow.imageUrl}
              extraItem={
                isAdmin &&
                <Icon
                  color={Colors.white}
                  dense
                  name="check"
                  containerStyle={styles.badge}
                />
              }
            />
          </View>
          <Card style={styles.nameCard}>
            <Text style={styles.textUserName}>{valuesToShow.nameText}</Text>
            {
              !isAdmin &&
              <Text style={styles.textUserEmail}>{valuesToShow.infoText}</Text>
            }
            {
              isAdmin &&
              <Text style={[styles.textUserType, userTypeColor]}>{valuesToShow.infoText}</Text>
            }
          </Card>
          {renderMenu}
        </View>
        <IconButton
          containerStyle={styles.alignTopRight}
          name="exit-to-app"
          size={Metrics.icons.medium}
          onPress={logout}
          color={Colors.blackSecondaryAlt}
        />
      </ScrollView>
      {loading && <LoadingOverlay />}
    </Container>
  )
}
Profile.propTypes = {
  logout: func.isRequired,
  onEditProfilePress: func.isRequired,
  onHelpPress: func.isRequired,
  onInvitePress: func.isRequired,
  onEditAdminPress: func.isRequired,
  onViewProfilePress: func.isRequired,
  onRateAppPress: func.isRequired,
  loading: bool.isRequired,
  onRefresh: func.isRequired,
  refreshing: bool.isRequired,
  user: shape(userPropTypes).isRequired,
}
