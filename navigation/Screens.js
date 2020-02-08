import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

// import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
// import ProScreen from '../screens/Pro';
// import SettingsScreen from '../screens/Settings';
import SharingScreen from '../screens/Sharing';
import DigitalCardScreen from '../screens/DigitalCard';
import AdvertisementScreen from '../screens/Advertisement';

import Menu from './Menu';
import Header from '../components/Header';
import { Drawer } from '../components/';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Perfil" navigation={navigation} goHome/>,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

// const SettingsStack = createStackNavigator({
//   Settings: {
//     screen: SettingsScreen,
//     navigationOptions: ({ navigation }) => ({
//       header: <Header title="Settings" navigation={navigation} />,
//     })
//   },
// }, {
//   cardStyle: { backgroundColor: '#EEEEEE', },
//   transitionConfig,
// });

// const ComponentsStack = createStackNavigator({
//   Components: {
//     screen: ComponentsScreen,
//     navigationOptions: ({ navigation }) => ({
//       header: <Header title="Components" navigation={navigation} />,
//     })
//   },
// }, {
//   cardStyle: { backgroundColor: '#EEEEEE', },
//   transitionConfig,
// });

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search tabs title="Assembéia Paraense" navigation={navigation} />,
    })
  },
  Advertisement: {
    screen: AdvertisementScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  // Sharing: {
  //   screen: SharingScreen,
  //   navigationOptions: ({navigation}) => ({
  //     header: <Header title="Convite" navigation={navigation} />,
  //   })
  // },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  initialRouteName: 'Home',
  transitionConfig,
}
);

const SharingStack = createStackNavigator({
  Sharing: {
    screen: SharingScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header title="Convites" navigation={navigation} goHome={true} />,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const DigitalCardStack = createStackNavigator({
  DigitalCard: {
    screen: DigitalCardScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header title="Carteira Digital" navigation={navigation} goHome={true}/>,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Profile" title="Perfil" goHome />
        ),
      }),
    },
    // Advertisement: {
    //   screen: AdvertisementScreen,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Advertisement" title="Advertisement" />
    //     ),
    //   }),
    // },
    // Settings: {
    //   screen: SettingsStack,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Settings" title="Settings" />
    //     ),
    //   }),
    // },
    // Components: {
    //   screen: ComponentsStack,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Components" title="Components" />
    //     ),
    //   }),
    // },
    // MenuDivider: {
    //   screen: HomeStack,
    //   navigationOptions: {
    //     drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
    //   },
    // },
    Sharing: {
      screen: SharingStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Sharing" title="Sharing" />
        ),
      }),
    },
    DigitalCard: {
      screen: DigitalCardStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="DigitalCard" title="DigitalCard" />
        ),
      }),
    },
    // SignUp: {
    //   screen: ProScreen,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Pro" title="Sign Up" />
    //     ),
    //   }),
    // },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;