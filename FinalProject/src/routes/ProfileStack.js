import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile/Profile';
import Camera from '../screens/Profile/Camera';
import {ThemeContext} from '../context/Theme';
import EditProfile from '../screens/Profile/EditProfile';
import ProfileList from '../screens/Profile/ProfileList';

const ProfileStack = createStackNavigator();

const ProfileNavigation = () => {
  const {
    mainTheme: {backgroundColor, primaryColor},
  } = useContext(ThemeContext);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
          headerTitleStyle: {fontFamily: 'LondrinaSolid-Regular'},
        }}
      />
      <ProfileStack.Screen
        name="Camera"
        component={Camera}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
          headerTitleStyle: {fontFamily: 'LondrinaSolid-Regular'},
        }}
      />
      <ProfileStack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
          headerTitleStyle: {fontFamily: 'LondrinaSolid-Regular'},
        }}
      />
      <ProfileStack.Screen
        name="Profile List"
        component={ProfileList}
        options={{
          headerTintColor: primaryColor,
          headerStyle: {backgroundColor: backgroundColor},
          headerTitleStyle: {fontFamily: 'LondrinaSolid-Regular'},
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
