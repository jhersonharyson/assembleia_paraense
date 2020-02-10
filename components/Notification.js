import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text } from 'react-native';
import { Banner } from 'react-native-paper';

export default class Notification extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: true,
    };
  }
  icon(type, size){
    switch(type){
      case "success": {
        return  <MaterialCommunityIcons name="check-outline" size={size} color="green" />
      }
      case "error": {
        return  <MaterialCommunityIcons name="close-circle-outline" size={size} color="red" />
      }
      case "warn": {
        return  <MaterialCommunityIcons name="alert" size={size} color="orange" />
      }
      default: {
        return <MaterialCommunityIcons name="check-outline" size={size} color="green" />
      }
    }
  }

  label(type){
     switch(type){
      case "success": {
        return  "Sucesso ao efetuar a operação."
      }
      case "error": {
        return  "Erro ao efetuar a operação."
      }
      default: {
        return "Sucesso ao efetuar a operação."
      }
    }

  }


  render() {
    return (
      <Banner
        visible={this.state.visible}
        actions={[
          // {
          //   label: 'Fix it',
          //   onPress: () => this.setState({ visible: false }),
          // },
          {
            label: 'FECHAR',
            onPress: () => this.setState({ visible: false }),
          },
        ]}
        icon={({ size }) => this.icon(this.props.type, size)}>
        
          <Text style={{fontSize: 20, paddingTop: 5}}>
            {this.props.label || this.label(this.props.type)}
          </Text>
        
      </Banner>
    );
  }
}