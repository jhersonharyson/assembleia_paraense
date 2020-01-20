import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated, Easing, KeyboardAvoidingView } from 'react-native';

import { AsyncStorage } from 'react-native';

import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card, TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import MultiStep from 'react-native-multistep-wizard'


class StepZero extends React.Component {
  state = {
    text: '',
    counter: new Animated.Value(0)
  }

  nextPreprocess(){
    Animated.timing(this.state.counter,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()
    this.props.saveState(0, {key:this.state.text})
    setTimeout(this.props.nextFn, 700)
  }

  render(){
    return ( 
    <Animated.View style={{transform: [{translateX: this.state.counter.interpolate({inputRange: [0,1], outputRange: [0, -1000]})}]}}>
      <Text style={styles.text}>PRECISAMOS DE ALGUMAS INFORMAÇÕES PARA GERAR O CONVITE</Text>
      <TouchableOpacity style={styles.button} onPress={()=>this.nextPreprocess()}>
        <Text style={styles.buttonLabel}>OK</Text>
      </TouchableOpacity>
    </Animated.View>
    )
  }
}


class StepOne extends React.Component {
  state = {
    text: '',
    counter: new Animated.Value(1),
    slideOut: new Animated.Value(0)
  }
  componentDidMount(){ 

     Animated.timing(this.state.counter,{
      toValue: 0, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()
  }


  nextPreprocess(){
    AsyncStorage.setItem('@INVITE_FORM_INVITED', this.state.text)
    Animated.timing(this.state.slideOut,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600

    }).start()

    this.props.saveState(1, {key:this.state.text})
    setTimeout(this.props.nextFn, 700)
  }

  previusPreprocess(){
    this.props.prevFn()
  }

  render(){
    return <Animated.View style={[{flexDirection: "row", width: "100%" },{transform: [{translateX: this.state.counter.interpolate({inputRange: [0,1], outputRange: [0, 1000]})}]}]}>
      <Animated.View style={[{width: "100%", transform: [{translateX: this.state.slideOut.interpolate({inputRange: [0,1], outputRange: [0, -1000]})}]}]}>
      <Text style={styles.text}>Qual o nome do convidado(a)?</Text>
      <TextInput mode="outlined" style={{fontSize: 20, marginBottom: 10}} onChangeText={text=>this.setState({text})}/>   
      
      <TouchableOpacity style={styles.button} onPress={()=>this.nextPreprocess()}>
        <Text style={styles.buttonLabel}>PROSSEGUIR</Text>
      </TouchableOpacity>
    </Animated.View>
    </Animated.View>
  }
}




class StepTwo extends React.Component {
  state = {
    text: '',
    invited: null,
    counter: new Animated.Value(1),
    slideOut: new Animated.Value(0)
  }
  componentDidMount(){
     Animated.timing(this.state.counter,{
      toValue: 0, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()
     AsyncStorage.getItem('@INVITE_FORM_INVITED')
     .then(invited=>{
       this.setState({invited})
     })
  }


  nextPreprocess(is_not_brazilian){
    AsyncStorage.setItem('@INVITE_FORM_IS_NOT_BRAZILIAN', ''+is_not_brazilian)
    Animated.timing(this.state.slideOut,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600

    }).start()

    this.props.saveState(2, {key: ''+is_not_brazilian})
    setTimeout(this.props.nextFn, 700)
  }

  previusPreprocess(){
    AsyncStorage.removeItem('@INVITE_FORM_INVITED')
    this.props.prevFn()
  }

  render(){
    return <Animated.View style={[{justifyContent: "center", flexDirection: "row" },{transform: [{translateX: this.state.counter.interpolate({inputRange: [0,1], outputRange: [0, 1000]})}]}]}>
      <Animated.View style={[{justifyContent: "center", }, {transform: [{translateX: this.state.slideOut.interpolate({inputRange: [0,1], outputRange: [0, -1000]})}]}]}>
          <Text style={styles.text}>{`${!!this.state.invited ? this.state.invited : 'O(A) Convidado(a) '}`} é estrangeiro(a) ?</Text>
      <View style={{flexDirection: "row", justifyContent: "space-around"}}>
        <TouchableOpacity style={styles.button} onPress={()=>this.nextPreprocess(false)}>
          <Text style={styles.buttonLabel}>NÃO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.nextPreprocess(true)}>
          <Text style={styles.buttonLabel}>SIM</Text>
        </TouchableOpacity>
     </View>
       <TouchableOpacity style={styles.buttonPrevious} onPress={()=>this.previusPreprocess()}>
        <Text style={styles.buttonLabelPrevious}>VOLTAR</Text>
      </TouchableOpacity>
    </Animated.View>
    </Animated.View>
  }
}

class StepThree extends React.Component {
  state = {
    text: '',
    invited: null,
    counter: new Animated.Value(1),
    slideOut: new Animated.Value(0)
  }
  async componentWillMount(){
    const previous = await AsyncStorage.getItem('@INVITE_FORM_REVOKE')
    const is_not_brazilian = await AsyncStorage.getItem('@INVITE_FORM_IS_NOT_BRAZILIAN')
    if(previous == "true") 
      this.props.prevFn()
    else if(is_not_brazilian=="true")
        this.props.nextFn()
  }
  componentDidMount(){
     Animated.timing(this.state.counter,{
      toValue: 0, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()

     AsyncStorage.getItem('@INVITE_FORM_INVITED')
     .then(invited=>{
       this.setState({invited})
     })
  }


  nextPreprocess(is_older){
    AsyncStorage.setItem('@INVITE_FORM_IS_OLDER', ''+is_older)
    Animated.timing(this.state.slideOut,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600

    }).start()

    setTimeout( ()=>{
      this.props.saveState(3, {key: ''+is_older})
      this.props.nextFn()
    }, 700)
      
     
  }

  previusPreprocess(){
    AsyncStorage.removeItem('@INVITE_FORM_IS_NOT_BRAZILIAN')
    this.props.prevFn()
  }


  render(){
    return <Animated.View style={{transform: [{translateX: this.state.counter.interpolate({inputRange: [0,1], outputRange: [0, 1000]})}]}}>
    <Animated.View style={{transform: [{translateX: this.state.slideOut.interpolate({inputRange: [0,1], outputRange: [0, -1000]})}]}}>
          <Text style={styles.text}>{`${!!this.state.invited ? this.state.invited : 'Ele(a) '} é maior de idade?`}</Text>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <TouchableOpacity style={styles.button} mode="outlined" onPress={()=>{this.nextPreprocess(false)}}>
            <Text style={styles.buttonLabel}>NÃO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} mode="outlined" onPress={()=>{this.nextPreprocess(true)}}>
            <Text style={styles.buttonLabel}>SIM</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonPrevious} onPress={()=>this.previusPreprocess()}>
          <Text style={styles.buttonLabelPrevious}>VOLTAR</Text>
        </TouchableOpacity>
   
    </Animated.View>
    </Animated.View>
  }
}


class StepFour extends React.Component {
  state = {
    text: '',
    invited: null,
    is_not_brazilian: null,
    counter: new Animated.Value(1),
    slideOut: new Animated.Value(0)
  }

  async componentWillMount(){
    
    const previous = await AsyncStorage.getItem('@INVITE_FORM_REVOKE')
    const is_not_brazilian = await AsyncStorage.getItem('@INVITE_FORM_IS_NOT_BRAZILIAN')
    const is_older = await AsyncStorage.getItem('@INVITE_FORM_IS_OLDER')
    if(previous == "true") 
      this.props.prevFn()
    else if(is_not_brazilian == "true" || is_older == "true")
      this.props.nextFn()

  }

  componentDidMount(){
     Animated.timing(this.state.counter,{
      toValue: 0, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()

    AsyncStorage.getItem('@INVITE_FORM_INVITED')
     .then(invited=>{
       this.setState({invited})
     })
  }


  nextPreprocess(){
    // AsyncStorage.setItem('@INVITE_FORM_INVITED', this.state.text)
    Animated.timing(this.state.slideOut,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600

    }).start()

    this.props.saveState(4, {key:this.state.text})
    setTimeout(this.props.nextFn, 700)
  }

  previusPreprocess(){
    this.props.prevFn()
  }


  render(){
    return <Animated.View style={[{justifyContent: "center", flexDirection: "row" },{transform: [{translateX: this.state.counter.interpolate({inputRange: [0,1], outputRange: [0, 1000]})}]}]}>
      <Animated.View style={[{justifyContent: "center", }, {transform: [{translateX: this.state.slideOut.interpolate({inputRange: [0,1], outputRange: [0, -1000]})}]}]}>
      <Text style={styles.text}>{`Informe o nome da mãe de ${this.state.invited}`}</Text>
      <TextInput mode="outlined" style={{fontSize: 20, marginBottom: 10}}  onChangeText={text=>this.setState({text})}/>   
      <TouchableOpacity style={styles.button} mode="outlined"  onPress={()=>{this.nextPreprocess()}}>
        <Text style={styles.buttonLabel}>PROSSEGUIR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonPrevious} onPress={()=>this.previusPreprocess()}>
        <Text style={styles.buttonLabelPrevious}>VOLTAR</Text>
      </TouchableOpacity>
    </Animated.View>
    </Animated.View>
  }
}

class StepFive extends React.Component {
  state = {
    text: '',
    invited: null,
    is_not_brazilian: null,
    counter: new Animated.Value(1),
    slideOut: new Animated.Value(0)
  }
   async componentWillMount(){
    const is_older = await AsyncStorage.getItem('@INVITE_FORM_IS_OLDER')
    if(is_older == "true")
      this.props.nextFn()

  }
  componentDidMount(){
     Animated.timing(this.state.counter,{
      toValue: 0, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600
    }).start()

    AsyncStorage.getItem('@INVITE_FORM_INVITED')
     .then(invited=>{
       this.setState({invited})
     })
    AsyncStorage.getItem('@INVITE_FORM_IS_NOT_BRAZILIAN')
     .then(is_not_brazilian=>{
       this.setState({is_not_brazilian: is_not_brazilian==='true'})
     })
  }


  nextPreprocess(){
    // AsyncStorage.setItem('@INVITE_FORM_INVITED', this.state.text)
    Animated.timing(this.state.slideOut,{
      toValue: 1, // Animate to final value of 1
      easing: Easing.elastic(),
      duration: 600

    }).start()

    this.props.saveState(5, {key:this.state.text})
    setTimeout(this.props.nextFn, 700)
  }

  previusPreprocess(){
    AsyncStorage.setItem('@INVITE_FORM_REVOKE', 'true').then(()=>this.props.prevFn())
  }


  render(){
    return <Animated.View style={[{justifyContent: "center", flexDirection: "row" },{transform: [{translateX: this.state.counter.interpolate({inputRange: [0,1], outputRange: [0, 1000]})}]}]}>
      <Animated.View style={[{justifyContent: "center", }, {transform: [{translateX: this.state.slideOut.interpolate({inputRange: [0,1], outputRange: [0, -1000]})}]}]}>
      <Text style={styles.text}>{`Informe o ${this.state.is_not_brazilian ? 'Passaporte': 'CPF'} de ${this.state.invited}`}</Text>
      <TextInput mode="outlined" style={{fontSize: 20, marginBottom: 10}}  onChangeText={text=>this.setState({text})}/>   
      <TouchableOpacity style={styles.button} mode="outlined" onPress={()=>{this.nextPreprocess()}}>
        <Text style={styles.buttonLabel}>PROSSEGUIR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonPrevious} onPress={()=>this.previusPreprocess()}>
        <Text style={styles.buttonLabelPrevious}>VOLTAR</Text>
      </TouchableOpacity>
    </Animated.View>
    </Animated.View>
  }
}








/* Define the steps of multistep wizard */

const steps = [
              {name: 'StepZero', component: <StepZero/>},
              {name: 'StepOne', component: <StepOne/>},
              {name: 'StepTwo', component: <StepTwo/>},
              {name: 'StepThree', component: <StepThree/>},
              {name: 'StepFour', component: <StepFour/>},
              {name: 'StepFive', component: <StepFive/>},
            ];

/* Define your class */

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B4E92',
    accent: '#f1c40f',
  },
};

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.clearAllData()
  }

/* define the method to be called when the wizard is finished */

  finish(wizardState){
  //code to be executed when wizard is finished
          alert(JSON.stringify(wizardState))
  }

  clearAllData() {
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
  }

  /* render MultiStep */
  render(){
      return(
        <PaperProvider theme={theme}>
          <>
            <TouchableOpacity style={{paddingTop: Constants.statusBarHeight}}><Text>FECHAR</Text></TouchableOpacity>
            <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardShouldPersistTaps={true} >
              <MultiStep steps={steps} onFinish={this.finish}/>
            </KeyboardAvoidingView>
          </>
        </PaperProvider>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingVertical: 50,

  },
  text: {
    paddingHorizontal: 25, 
    marginBottom: 30, 
    fontSize: 25, 
    fontWeight: 100,
    textAlign: "center",
    textTransform: "uppercase"
  }, 
  button:{
    borderWidth: 2, 
    borderColor: "#1B4E92",//"#63b563", 
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 3,
    minWidth: 125
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4E92"//"#63b563"
  },
  buttonPrevious:{
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 3,
    minWidth: 100
  },
  buttonLabelPrevious: {
    fontSize: 20,
    color: "#888"//"#63b563"
  }
});
