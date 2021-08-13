import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';
import {ThemeContext} from '../context/Theme';

const SettingStack = createStackNavigator();

const SettingNavigation = () => {
  const {
    mainTheme: {backgroundColor, textColor, primaryColor},
  } = useContext(ThemeContext);

  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
          headerTitleStyle: {fontFamily: 'LondrinaSolid-Regular'},
        }}
      />
    </SettingStack.Navigator>
  );
};

export default SettingNavigation;
