import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { QRCode } from 'react-native-custom-qr-codes-expo';

import materialTheme from '../constants/Theme';

import InviteCard from './InviteCard'
import ImageLoader from './ImgaeLoader';

const { width } = Dimensions.get('screen');



class IviteItem extends React.Component {
  render() {
    const { navigation, invite, horizontal, full, style, inviteColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block card flex style={[styles.ticket, styles.shadow, style]}>
        <Block flex space="between" style={styles.changeble}>
          <View style={styles.imageContainer}>
            <ImageLoader 
                style={styles.barcodeImage}
                source={require('./../assets/images/barcode.png')}
            />
           </View>
        </Block>    
        <View style={styles.dashed}>

        </View>
        
        <Block flex space="between" style={styles.ticketDescription}>
          <View style={styles.headerContainer}>
            <ImageLoader 
                  style={styles.apImage}
                  source={require('./../assets/images/ap.png')}
            />
            <Text style={styles.titleText}>ASSEMBLÉIA PARAENSE</Text>
          </View>
          <View>
            <Text size={14} style={styles.productTitle}>{invite.title}</Text>
            <Text size={12} muted={!inviteColor} color={inviteColor}>{invite.validate}</Text>
          </View>
        </Block>
      </Block>
    );
  }
}

export default withNavigation(IviteItem);

const styles = StyleSheet.create({
  ticket: {
   justifyContent: 'space-between',
   flexDirection: 'row',
   height: 100,
   marginVertical: 10,
   borderRadius: 10,
   overflow: "hidden",
   elevation: 3,
   backgroundColor: "#fff"
  },
  changeble:{
    width: 70,
    justifyContent: 'center',
    alignItems: "center",
    // backgroundColor: "#7398c9",
  },
  dashed: {
    width: .5,
    height: "100%",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#c2c2c2",
    borderRadius: 0.001,
  },
  barcodeImage: {
    backgroundColor: "#fff",
    width: 65,
    height: 45,
    resizeMode: 'stretch'
  },
  apImage: {
    backgroundColor: "#fff",
    width: 24,
    height: 24,
    resizeMode: 'stretch',
    marginRight: 10,
    borderRadius: 12
  },
  productTitle: {
    flexWrap: 'wrap',
    marginBottom: 3
  },
  ticketDescription: {
    padding: theme.SIZES.BASE / 2,
    flex: 3,
  },
  titletext: {
    fontSize: 14, 
    fontWeight: '300',
  },
  headerContainer: {
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 10
  },
  imageContainer: {
    transform: [{rotate: "90deg"}],
    elevation: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    width: 75,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});