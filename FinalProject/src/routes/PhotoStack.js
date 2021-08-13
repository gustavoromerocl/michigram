import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile/Profile';
import {ThemeContext} from '../context/Theme';
import colors from '../config/colors';

const PhotoStack = createStackNavigator();

const PhotoNavigation = () => {
  const {
    mainTheme: {backgroundColor, textColor, primaryColor},
  } = useContext(ThemeContext);

  return (
    <PhotoStack.Navigator>
      <PhotoStack.Screen
        name="Photo"
        component={Profile}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
        }}
      />
    </PhotoStack.Navigator>
  );
};

export default PhotoNavigation;
