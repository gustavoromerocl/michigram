// In App.js in a new project

import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import {ThemeContext} from '../context/Theme';

const HomeStack = createStackNavigator();

const HomeNavigation = () => {
  const {
    mainTheme: {backgroundColor, textColor, primaryColor},
  } = useContext(ThemeContext);

  return (
    <HomeStack.Navigator headerMode="screen">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
          headerTitleStyle: {fontFamily: 'LondrinaSolid-Regular'},
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
