import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, FlatList } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Product, InviteCard, InviteItem } from '../components';

const { width } = Dimensions.get('screen');

import invites from '../constants/invites';

import { converterToShareFile } from './../services/sharing'

export default class Home extends React.Component {

  textRef = React.createRef()
  inviteRef = React.createRef()
  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="O que você está procurando?"
      />
    )
  }

  shareFile = () =>{
    converterToShareFile({
      elementRef: this.inviteRef, 
      fileName: new Date().toLocaleString()
    })
  }
  

  render() {
    return (
      <Block flex center style={styles.home}>
       
       <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
         
    
        {/* <InviteCard ref={(r)=>{this.inviteRef = r}}/> */}
  

         <Block center>
            <Button shadowless style={[styles.button, styles.shadow]} onPress={this.shareFile} color="#1B4E92" icon="user">
              EMITIR NOVO CONVITE
            </Button>
          </Block>

         <Block>
            <Text h5 style={{marginVertical: 15, marginLeft: 10,}}>
              Últimos convites 
            </Text>
          </Block>

          <FlatList 
            data={invites}
            renderItem={ ({item, index}) => <InviteItem key={index} invite={item} />}
            keyExtractor={(item, index) => index.toString()}
          /> 
          

        </Block>
      </ScrollView>
       
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
