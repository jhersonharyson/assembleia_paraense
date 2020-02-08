import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Animated, Easing } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { Button, Dialog, Portal, FAB, TextInput, Avatar  } from 'react-native-paper';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Icon, Product, InviteCard, InviteItem } from '../components';

const { width } = Dimensions.get('screen');

import invites from '../constants/invites';

import { converterToShareFile } from './../services/sharing'

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inviteForm: false,
      modal: false,
      counter: new Animated.Value(0),
      newInvite: {
        name: "",
        isNotBrazilian: null,
        cpf: "",
        passport: "",
        isOlder: null,
        motherName: "",
        access: null,
        canInvite: false        
      }
    }
  }


  componentDidMount(){
    Animated.timing(this.state.counter,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()
  }
  textRef = React.createRef()
  inviteRef = React.createRef()

  // dispatchCallback = React.useCallback(() => {
  //   this.canInvite()
  // }, [...this.state.newInvite])

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
  
  cpfMask(v) {
    v = v.replace(/\D/g, ""); // Remove tudo o que não é dígito
    v = v.substring(0, 11)
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos
    // de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  canInvite(){
    setTimeout( ()=>{
      const {name, cpf, access, motherName, passport, isOlder, isNotBrazilian} = this.state.newInvite
      if((!!name && `${cpf}`.length == 14 && isOlder && !isNotBrazilian == true && !!access)){
        this.setState({newInvite: {...this.state.newInvite, passport: "", motherName: "", canInvite: true}})
      }
      else if((!!name && isOlder === false && !!motherName && !!access)){
        this.setState({newInvite: {...this.state.newInvite, cpf: "", passport: "", canInvite: true}})
      }
      else if((!!name && isNotBrazilian && !!passport && !!access)){
        this.setState({newInvite: {...this.state.newInvite, cpf: "", motherName: "", canInvite: true}})
      }
      else {
        this.setState({newInvite: {...this.state.newInvite, canInvite: false}})
      }
    }, 100)
  }


  render() {
    return (
      <>
        <Block flex center style={styles.home}>
          { 
          !this.state.inviteForm &&
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={()=>{this.setState({inviteForm: true})}} 
          />
          }
        <View
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.products}>
           
            
            {this.state.inviteForm && 
             <Block flex>
              <KeyboardAwareScrollView behavior="padding" enabled keyboardShouldPersistTaps="always" contentContainerStyle={{flex: 1, paddingHorizontal: 5}} style={{flex: 1}}>
                <ScrollView style={{width: "100%", height: "100%", margin: 0, padding: 0}}>
                
                  <View style={[styles.paddingFields, {paddingTop: 30}]}>
                    <Text style={styles.text}>PRECISAMOS DE ALGUMAS INFORMAÇÕES PARA GERAR O CONVITE</Text>
                  </View>
                  <View style={{paddingTop: 15}}>
                    <TextInput  mode="outlined" label="Nome do convidado" value={this.state.newInvite.name} onChangeText={text=>{ this.setState({newInvite: {...this.state.newInvite, name: text.substring(0, 25)}}); this.canInvite()}} />
                  </View>
                  <View style={styles.paddingFields}>
                    <Text>
                      O convidado(a) é extrangeiro(a)?
                    </Text>
                    <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 5}}>
                        <TouchableOpacity style={[styles.button, this.state.newInvite.isNotBrazilian === false ? styles.buttonActived : null]} onPress={()=>{this.setState({newInvite: {...this.state.newInvite, isNotBrazilian: false}}); this.canInvite()}}>
                          <Text style={styles.buttonLabel}>NÃO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, this.state.newInvite.isNotBrazilian === true ? styles.buttonActived : null]} onPress={()=>{this.setState({newInvite: {...this.state.newInvite, isNotBrazilian: true}}); this.canInvite()}}>
                          <Text style={styles.buttonLabel}>SIM</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                  {
                    this.state.newInvite.isNotBrazilian &&
                    <View style={styles.paddingFields}>
                      <TextInput mode="outlined" label="Passaporte" value={this.state.newInvite.passport} onChangeText={text=> { this.setState({newInvite: {...this.state.newInvite, passport: text}}); this.canInvite()}}/>
                    </View>
                  }
                  {
                    !this.state.newInvite.isNotBrazilian && this.state.newInvite.isNotBrazilian != null && 
                    <>
                      <View style={styles.paddingFields}>
                        <Text>
                          O convidado(a) é maior de idade(a)?
                        </Text>
                        <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 5}}>
                            <TouchableOpacity style={[styles.button, this.state.newInvite.isOlder === false ? styles.buttonActived : null]} onPress={()=>{this.setState({newInvite: {...this.state.newInvite, isOlder: false}}); this.canInvite()}}>
                              <Text style={styles.buttonLabel}>NÃO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, this.state.newInvite.isOlder === true ? styles.buttonActived : null]} onPress={()=>{this.setState({newInvite: {...this.state.newInvite, isOlder: true}}); this.canInvite()}}>
                              <Text style={styles.buttonLabel}>SIM</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                      { 
                        !this.state.newInvite.isOlder && this.state.newInvite.isOlder != null && 
                        <View style={styles.paddingFields}>
                          <TextInput mode="outlined" label="Nome da mãe" value={this.state.newInvite.motherName} onChangeText={text=>{ this.setState({newInvite: {...this.state.newInvite, motherName: text.substring(0, 25)}}); this.canInvite()}}/>
                        </View>
                      }
                    </>
                  }
                  
                  { 
                    this.state.newInvite.isOlder && !this.state.newInvite.isNotBrazilian &&
                    <View style={styles.paddingFields}>
                      <TextInput mode="outlined" label="CPF" value={this.state.newInvite.cpf} onChangeText={text=>{ this.setState({newInvite: {...this.state.newInvite, cpf: this.cpfMask(text)}}); this.canInvite()}} />
                    </View>
                  }

                  {
                    ( 
                      !!this.state.newInvite.cpf || 
                      !!this.state.newInvite.passport || 
                      !!this.state.newInvite.motherName 
                    ) && ( 
                    <View style={styles.paddingFields}>
                      <Text>
                        Qual a área de acesso?
                      </Text>
                      <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 5,}}>
                          <TouchableOpacity style={[styles.button, this.state.newInvite.access === "BOATE" ? styles.buttonActived : null]} onPress={()=>{this.setState({newInvite: {...this.state.newInvite, access: "BOATE"}}); this.canInvite()}}>
                            <Text style={styles.buttonLabel}>BOATE</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.button, this.state.newInvite.access === "CLUBE" ? styles.buttonActived : null]} onPress={()=>{this.setState({newInvite: {...this.state.newInvite, access: "CLUBE"}}); this.canInvite()}}>
                            <Text style={styles.buttonLabel}>CLUBE</Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                    )
                  }

                  <View style={[styles.paddingFields, {paddingBottom: 20}]}>
                    {
                      this.state.newInvite.canInvite &&
                      <Button shadowless style={[styles.envite, styles.shadow, styles.block]} onPress={()=>this.setState({modal: true})} color="#1B4E92" icon="email-outline">
                        EMITIR CONVITE
                      </Button>
                    }
                    <Button shadowless style={[styles.block, {marginTop: 3}]} onPress={()=>this.setState({inviteForm: false})} color="#1B4E92">
                      VOLTAR
                    </Button>
                  </View>

                </ScrollView>
              </KeyboardAwareScrollView>
             </Block>
            }
            {!this.state.inviteForm && 
              <View style={styles.containerListInvites}> 
                {/* <Block center>
                  <TouchableOpacity style={[styles.button, styles.shadow, styles.block]} onPress={()=>{this.setState({inviteForm: true})}} color="#1B4E92" icon="user">
                    <Text>
                      EMITIR NOVO CONVITE
                    </Text>
                  </TouchableOpacity>
                </Block> */}
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
                </View> 
            }
              

         
        
        </View>
        
      </Block>
      <Portal>
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
      </Portal>
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
