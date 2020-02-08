import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Animated, Easing } from 'react-native';

import { Block, Text, Input, theme } from 'galio-framework';

import ClubCard from './../components/ClubCard'

import { Button, Dialog, Portal, FAB, TextInput, Avatar  } from 'react-native-paper';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Icon, Product, InviteCard, InviteItem } from '../components';

const { width } = Dimensions.get('screen');

import invites from '../constants/invites';

import { converterToShareFile } from '../services/sharing'

export default class DigitalCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }


  componentDidMount(){
    // Animated.timing(this.state.counter,{
    //   toValue: 1, // Animate to final value of 1
    //   easing: Easing.elastic(),
    //   duration: 600
    // }).start()
  }
  textRef = React.createRef()
  inviteRef = React.createRef()

  shareFile = () =>{
    converterToShareFile({
      elementRef: this.inviteRef, 
      fileName: new Date().toLocaleString()
    })
  }
  
  
  render() {
    return (
      <>
        <Block flex center style={styles.home}>
        <View
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.products}>
              <View style={styles.containerListInvites}> 

                  <View style={{marginTop: 35}}>
                    <ClubCard />
                  </View>
                  
                  <Block style={{marginTop: 10, marginLeft: 10}}>
                    <Text h6 style={{ fontSize: 10}}>
                      SÓCIO
                    </Text>
                    <Text h6 style={{ fontSize: 16}}>
                      Fulana de tal
                    </Text>
                    <Text h5 style={{}}>
                    asdasdassad
                    </Text>
                    <Text h5 style={{}}>
                    asdasdassad
                    </Text>
                    <Text h5 style={{}}>
                    asdasdassad
                    </Text>
                  </Block>

                </View>         
        </View>
      </Block>
      {/* <Portal>
        <Dialog visible={this.state.modal}  onDismiss={()=>this.setState({modal: false})}>
          <View style={{padding: 15,}}>
            <View style={{margin: 15, height: 140}}>
              <Text style={{fontWeight: '600', marginBottom: 5}}>Confirmação do convite</Text>
              <View style={{display: "flex", flexDirection: "row", marginVertical: 15, justifyContent: "center" }}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                  <Avatar.Text size={36} label={this.state.newInvite.name[0]} />
                  <Text style={[styles.text, {marginBottom: 0, fontSize: 14, paddingHorizontal: 5, marginTop: 5}]}>{this.state.newInvite.name}</Text>
                  <Text style={{fontSize: 10, paddingHorizontal: 55}}>{this.state.newInvite.isNotBrazilian ? this.state.newInvite.passport : this.state.newInvite.isOlder ? this.state.newInvite.cpf: ''}</Text>
                </View>
              </View>
              <Button shadowless style={[styles.button, styles.shadow, styles.block]} onPress={this.shareFile} color="#1B4E92" icon="email">
                CONVIDAR
              </Button>
            </View>
            <View style={{marginTop: -20, marginLeft: -20}}> 
              <InviteCard ref={(r)=>{this.inviteRef = r}} {...this.state.newInvite}/>
            </View>
          </View>
        </Dialog>
      </Portal> */}
     </>
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
    width: "100%",
    paddingHorizontal: 5,
    padding: 0,
    height: "100%",
    flex: 1
  },
  containerListInvites:{
    width: width - theme.SIZES.BASE * 2,
    padding: 0,
    height: "100%",
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#1B4E92",
    zIndex: 100
  },
  button:{
    borderWidth: 2, 
    borderColor: "#1B4E92",//"#63b563", 
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 3,
    width: "49%"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B4E92"//"#63b563"
  },
  text: {
    paddingHorizontal: 25, 
    marginBottom: 30, 
    fontSize: 21, 
    fontWeight: "100",
    textAlign: "center",
    textTransform: "uppercase"
  }, 
  buttonActived:{
    borderWidth: 3, 
    borderColor: "#1B4E92",//"#63b563", 
    backgroundColor: "#1B4E9255",//"#63b563", 

  },
  block:{
    width: "100%"
  },
  paddingFields:{
    paddingTop: 20,
    alignItems: "stretch",
  },
  envite:{
    borderWidth: 2, 
    borderColor: "#1B4E92",//"#63b563", 
    fontWeight: "bold",
    height: 40,
    borderRadius: 3,
  }
});
