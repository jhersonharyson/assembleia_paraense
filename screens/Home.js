import React from 'react';
import { StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Advertisement } from '../components/';

const { width } = Dimensions.get('screen');
// import products from '../constants/products';
import AdvertisementService from '../services/advertisement';
import logger from '../services/logger';
import Notification from '../components/Notification';

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      refreshing: false,
      advertisements: [],
      notification: null,
    }
    
    this.init()
  }

  async init(){
    try{
      logger.log('1wfdad')
      const response = await AdvertisementService.getAdvertisement()
      logger.log(response)
      logger.log(response.data)
      const { advertisements } = response.data
      this.setState({advertisements})
    }catch(e){
      logger.log(e)
      this.setState({notification: "error"})
    }
  }

  onRefresh = () =>{
    this.setState({refreshing: true})
    this.init()
    setTimeout(()=>this.setState({refreshing: false}), 3000)
  }
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

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
        refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} /> } >
        <Block flex>
          {
            this.state.advertisements.map((rowAdvertisements, index) =>{
              if(rowAdvertisements.length == 1)
                return <Advertisement key={index} advertisement={rowAdvertisements[0]} />
              else 
                return (
                  <Block key={index} flex row>
                    <Advertisement advertisement={rowAdvertisements[0]} style={{ marginRight: theme.SIZES.BASE }} />
                    <Advertisement advertisement={rowAdvertisements[1]} />
                  </Block>
                )
            })
          }

        </Block>
        {/* { !!this.state.notification && <Notification type={this.state.notification}/> } */}
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
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
