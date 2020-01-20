import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, SafeAreaView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Advertisement extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    const {navigation} = this.props
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={require('./../assets/images/market/agenda-padrao-musica.png')}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
              <SafeAreaView style={{alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                  <Icon family="AntDesign" name="close" style={{fontSize: 32, marginRight: 5, marginTop: 5}} />
                </TouchableOpacity>
              </SafeAreaView>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>advertisement</Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">
                        {this.props.navigation.state.params.advertisement.date}
                      </Text>
                    </Block>
                  </Block>
                  {/* <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                      {` `} Los Angeles, CA
                      </Text>
                  </Block> */}
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, marginBottom: 10 }}>
              <Block>
                <Text bold size={18} style={{marginBottom: 20}}>
                  { this.props.navigation.state.params.advertisement.title }
                </Text>
                <Text muted size={12}>
                  { this.props.navigation.state.params.advertisement.description }
                </Text>
              </Block>
            </Block>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>valor</Text>
                <Text muted size={12}>
                  { this.props.navigation.state.params.advertisement.price }
                </Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>horário</Text>
                <Text muted size={12}>
                  { this.props.navigation.state.params.advertisement.date }
                </Text>
              </Block>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Mais detalhes</Text>
            </Block>
            <Block style={{ marginBottom: 100 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }} >
                {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={{ uri: img }}
                    key={`viewed-${img}`}  
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.ERROR,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: "100%",
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});
