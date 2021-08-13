// In App.js in a new project

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ButtonsTabStack from './ButtonsTabStack';
import Login from '../screens/Login/Login';
import {connect} from 'react-redux';
import {isLoggedIn} from '../redux/actions';

const RootStack = createStackNavigator();

const RootNavigation = ({loggedIn, isCurrentlyLoggedIn}) => {
  useEffect(() => {
    isCurrentlyLoggedIn();
  }, [isCurrentlyLoggedIn]);

  if (loggedIn === undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none" initialRouteName="Login">
        {loggedIn ? (
          <RootStack.Screen name="ButtonsTab" component={ButtonsTabStack} />
        ) : (
          <RootStack.Screen name="Login" component={Login} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = (state) => ({
  loggedIn: state.login.valid,
});

const mapDispatchToProps = (dispatch) => ({
  isCurrentlyLoggedIn: () => dispatch(isLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
