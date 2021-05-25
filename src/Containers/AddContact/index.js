import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  Button,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AddContact from '@/Store/Contact/AddContact';

import {navigateAndSimpleReset} from '@/Navigators/Root';
import {unwrapResult} from '@reduxjs/toolkit';

import Toast from 'react-native-toast-message';

const IndexAddContactContainer = ({navigation}) => {
  const [firstName, changeFirstName] = useState('');
  const [lastName, changeLastName] = useState('');
  const [age, changeAge] = useState('');

  const dispatch = useDispatch();
  const addContactIsLoading = useSelector(
    state => state.contact.addContact.loading,
  );
  const addContactIsOnError = useSelector(
    state => state.contact.addContact.error,
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingVertical: 16}}>
      <View style={{alignItems: 'center', marginBottom: 32}}>
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            backgroundColor: '#e9e9e9',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon size={120} color="white" name="person" />
        </View>
      </View>
      <View style={{paddingHorizontal: 16, backgroundColor: '#f7f7f7'}}>
        <TextInput
          placeholder={'First name'}
          placeholderTextColor={'grey'}
          value={firstName}
          onChangeText={changeFirstName}
          style={{
            color: 'black',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
          }}
        />
        <TextInput
          placeholder={'Last name'}
          placeholderTextColor={'grey'}
          value={lastName}
          onChangeText={changeLastName}
          style={{
            color: 'black',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
          }}
        />
        <TextInput
          placeholder={'Age'}
          placeholderTextColor={'grey'}
          value={age}
          onChangeText={changeAge}
          style={{color: 'black'}}
          keyboardType={'numeric'}
        />
      </View>
      {addContactIsLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'teal'}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: 16,
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '80%',
            alignSelf: 'center',
            bottom: 16,
          }}
          onPress={() => {
            let data = {
              firstName: firstName,
              lastName: lastName,
              age: age,
              photo: 'N/A',
            };
            dispatch(AddContact.action(data))
              .then(unwrapResult)
              .then(originalPromiseResult => {
                if (
                  originalPromiseResult.error == null &&
                  originalPromiseResult.message
                ) {
                  Toast.show({
                    text1: 'Success',
                    text2: originalPromiseResult.message,
                    type: 'success',
                  });
                  setTimeout(() => {
                    navigateAndSimpleReset('Contact List');
                  }, 500);
                }
              })
              .catch(rejectedValueOrSerializedError => {
                if (rejectedValueOrSerializedError.data === undefined) {
                  Toast.show({
                    text1: 'Failed',
                    text2: rejectedValueOrSerializedError.message,
                    type: 'error',
                  });
                }

                if (
                  rejectedValueOrSerializedError.data &&
                  rejectedValueOrSerializedError.data.message
                ) {
                  Toast.show({
                    text1: 'Failed',
                    text2: rejectedValueOrSerializedError.data.message,
                    type: 'error',
                  });
                }
              });
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#22409A',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Save</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IndexAddContactContainer;
