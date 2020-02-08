import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Text, Platform, Image } from 'react-native';
import { Block, Button, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={require('./../assets/images/ap.png')}
            style={{ height: 200, width: 200, marginTop: "40%", zIndex: 1,  }}
            blurRadius={0}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text style={{fontWeight: '200', fontSize: 26, color: "#0054a5"}}>ASSEMBLÉIA</Text>
              </Block>
              <Block row>
                <Text style={{fontSize: 46, color: "#0054a5"}}>PARAENSE</Text>
              </Block>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color="#0054a5"
                onPress={() => navigation.navigate('Home')}>
                ENTRAR
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
