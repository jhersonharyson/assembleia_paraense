import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';


export default class ClubCard extends React.Component {
  render() {
    return (
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Card style={{width: 250, height: 155, borderRadius:10, overflow: 'hidden'}}>
          <LinearGradient
            colors={['#5943d5', '#1d0f89']}
            style={{flex: 1, padding: 15, justifyContent: "space-between"}}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          >
            <View>
              <Text style={styles.text}>SÓCIO ASSOCIADO</Text>
              <Text style={styles.name}>Fulana de tal</Text>
              <Text style={styles.code}>1920321321</Text>
            </View>
            <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "flex-end"}}>
              <View style={{justifyContent: "flex-start", flexDirection: "row"}}>
                <View>
                  <Text style={styles.dateLabel}>Emissão</Text>
                  <Text style={styles.date}>20/20/2020</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.dateLabel}>Validade</Text>
                  <Text style={styles.date}>20/20/2020</Text>
                </View>
              </View>
               <View style={{backgroundColor: "red", borderRadius: 18, overflow: "hidden"}}>
                <Image source={require('./../assets/images/ap.png')} style={{width: 36, height: 36}}/>
              </View>
            </View>
          </LinearGradient>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
    marginTop: 5
  },
  code: {
    fontSize: 11,
    color: 'white',
    fontWeight: '100',
    marginTop: -1
  },
  dateLabel: {
    fontSize: 11,
    color: 'white',
    fontWeight: '100'
  },
   date: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold'
  }
});
