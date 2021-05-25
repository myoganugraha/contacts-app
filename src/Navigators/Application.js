import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IndexContactListContainer, IndexAddContactContainer} from '@/Containers';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, goBack} from '@/Navigators/Root';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Contact List">
        <Stack.Screen
          name="Contact List"
          component={IndexContactListContainer}
        />
        <Stack.Screen
          name="Add Contact"
          component={IndexAddContactContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
