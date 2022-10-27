import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import AutoController from './screens/AutoController';
import GreenhouseController from './screens/GreenhouseController';

//Screen names
const homeName = 'Automation Controller';
const secondaryName = 'Greenhouse Controller';

const Tab = createBottomTabNavigator();

function NavContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === secondaryName) {
              iconName = focused ? 'list' : 'list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3EB489',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
          tabBarStyle: {padding: 10, height: 70},
        })}>
        <Tab.Screen name={homeName} component={AutoController} />
        <Tab.Screen name={secondaryName} component={GreenhouseController} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
