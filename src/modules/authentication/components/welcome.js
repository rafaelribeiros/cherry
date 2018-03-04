import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StatusBar,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import Swiper from 'react-native-swiper'

import { Touchable } from '../../../modules/shared/components/touchable'
import { Images, Colors } from '../../../constants'
import { styles } from './styles/welcome.style'


export class Welcome extends Component {

  state = {
    userLoggedOnce: false
  }


  goToLogin = () => {
    const { navigator } = this.props
  }
  goToSignup = () => {
    const { navigator } = this.props
  }

  render() {
    // const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          animated
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Swiper
          loop={false}
          dotColor={Colors.whiteDisabled2}
          activeDotColor={Colors.whiteSecondary}
        >
          <View style={styles.slide}>
            <ImageBackground resizeMode="cover" source={Images.signUp} style={styles.fullSizeImage} />
          </View>
          <View style={styles.slide}>
            <ImageBackground resizeMode="cover" source={Images.signUp} style={styles.fullSizeImage} />
          </View>
          <View style={styles.slide}>
            <ImageBackground resizeMode="cover" source={Images.signUp} style={styles.fullSizeImage}>
              <View style={styles.textWrapper}>
                <Text style={styles.title}>Não perca tempo</Text>
                <Text style={styles.text}>Tudo o que você precisa na palma da mão e sempre atualizado</Text>
              </View>
            </ImageBackground>
          </View>
        </Swiper>
        <View style={styles.buttonsContainer}>
          <Touchable style={styles.buttonSignup} onPress={this.goToSignup}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.white }}>INICIAR</Text>
          </Touchable>
        </View>
      </View>
    )
  }
}
