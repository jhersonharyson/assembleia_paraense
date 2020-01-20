import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import miniwave from './../assets/images/miniwave.png';
import ap from './../assets/images/ap.png';
import waves from './../assets/images/waves.jpeg';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

// import { QRCode } from 'react-native-custom-qr-codes-expo';
// import QRCode from 'react-native-qrcode';

import { QRCode } from 'react-native-custom-qr-codes-expo';


const Card = View
// const QRCode = View
export default class InviteCard extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={[styles.container, this.props.mini && {transform: [{scale: .4}]} ]}>
        <Card style={{ borderRadius: 15, backgroundColor: '#fff' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: 0,
              padding: 0,
              borderRadius: 15,
            }}>
            <View style={{ display: 'flex', flex: 15, border: 0 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#6eabda',
                  borderTopLeftRadius: 15,
                  height: 25,
                }}>
                <Text
                  style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                  CONVITE ONLINE
                </Text>
              </View>
              <View style={{backgroundColor: '#fff'}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 15,
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#1f6aa0',
                    }}>
                    === {` `}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#1f6aa0',
                    }}>
                    CARTÃO DE ACESSO
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: '#1f6aa0',
                    }}>
                    {` `}===
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '100',
                      color: '#1f6aa0',
                    }}>
                    PASSAPORTE AP
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 25,
                  }}>
                  <Image
                    source={miniwave}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 2,
                    }}>
                    <Text
                      style={{
                        color: '#6eabda',
                        fontSize: 7,
                        fontWeight: '700',
                      }}>
                      CONVIDADO
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#6eabda',
                        fontSize: 7,
                        fontWeight: '200',
                      }}>
                      JHERSON HARYSON
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        color: '#6eabda',
                        fontSize: 7,
                        fontWeight: '700',
                      }}>
                      ACESSO
                    </Text>
                    <Text
                      style={{
                        color: '#6eabda',
                        fontSize: 7,
                        fontWeight: '200',
                      }}>
                      CLUBE
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#6eabda',
                          fontSize: 7,
                          fontWeight: '700',
                        }}>
                        CPF
                      </Text>
                      <Text
                        style={{
                          color: '#6eabda',
                          fontSize: 6,
                          fontWeight: '200',
                        }}>
                        000.000.000-00
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#6eabda',
                    height: 1.5,
                    width: '70%',
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 3,
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 2,
                  }}>
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '700',
                    }}>
                    MAIOR DE IDADE
                  </Text>
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '200',
                    }}>
                    SIM
                  </Text>
                  <View style={{ marginTop: 7 }} />
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '700',
                    }}>
                    SENHA
                  </Text>
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '200',
                    }}>
                    123456
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '700',
                    }}>
                    SOLICITANTE
                  </Text>
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '200',
                    }}>
                    JHERSON
                  </Text>
                  <View style={{ marginTop: 7 }} />
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '700',
                    }}>
                    DATA
                  </Text>
                  <Text
                    style={{
                      color: '#6eabda',
                      fontSize: 7,
                      fontWeight: '200',
                    }}>
                    00/00/0000
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}>
                  <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
                    <Image
                      source={ap}
                      style={{ width: 48, height: 48 }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  height: 35,
                  borderBottomLeftRadius: 15,
                  border: "5px solid black",
                  padding: 0,
                  margin: 0,
                }}>
                <Image
                  source={waves}
                  style={{
                    minHeight: 30,
                    width: '100%',
                    position: 'absolute',
                    bottom: -15,
                    padding: 0,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flex: 5,
                height: '100%',
                border: 0,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: '#6eabda',
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 25,
                  backgroundColor: '#fff',
                  borderTopRightRadius: 15,
                }}>
                <Text
                  style={{
                    color: '#6eabda',
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>
                  CÓDIGO
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#6eabda',
                  padding: 15,
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-around",
                  borderBottomRightRadius: 15
                }}>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 7,
                      textAlign: 'center',
                    }}>
                    ESTE CONVITE NÃO PODERÁ SER CANCELADO, SUBSTITUIDO OU
                    TRANSFERIDO
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginTop: 15,
                    marginLeft: -7,
                    height: 60,
                    width: 64,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>

                <QRCode
                  content={"ASSEMBLÉIA PARAENSE QRCODE"}
                  size={60}
                  bgColor='purple'
                  fgColor='white'/>
                </View>
              </View>
             
            </View>
          </View>
        </Card>

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    width: 330,
    transform: [{scale: 0.8}]
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
