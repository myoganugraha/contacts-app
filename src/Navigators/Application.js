import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IndexContactListContainer} from '@/Containers';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, goBack} from '@/Navigators/Root';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen
          name="ContactList"
          component={IndexContactListContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
