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

import FetchContactDetails from '@/Store/Contact/FetchContactDetails';
import ResetContactDetails from '@/Store/Contact/ResetContactDetails';
import {getInitial, isValidURL} from '@/Function';
import {unwrapResult} from '@reduxjs/toolkit';

import Toast from 'react-native-toast-message';

const IndexContactDetailsContainer = ({route, navigation}) => {
  const {contactInformation} = route.params;
  const [firstName, changeFirstName] = useState(contactInformation.firstName);
  const [lastName, changeLastName] = useState(contactInformation.lastName);
  const [age, changeAge] = useState(contactInformation.age.toString());
  const [photo, changePhoto] = useState(contactInformation.photo);
  const [isEditable, changeIsEditable] = useState(false);

  const dispatch = useDispatch();
  const contactDetails = useSelector(state => state.contact.contactDetails);
  const contactDetailsIsLoading = useSelector(
    state => state.contact.fetchContactDetails.loading,
  );
  useEffect(() => {
    dispatch(ResetContactDetails.action());
  }, [navigation]);

  useEffect(() => {
    if (contactDetails == null) {
      dispatch(FetchContactDetails.action(contactInformation.id))
        .then(unwrapResult)
        .then(originalPromiseResult => {
          console.log({originalPromiseResult});
          if (originalPromiseResult.data) {
            changeFirstName(originalPromiseResult.data.firstName);
            changeLastName(originalPromiseResult.data.lastName);
            changeAge(originalPromiseResult.data.age.toString());
            changePhoto(originalPromiseResult.data.photo);

            Toast.show({
              text1: 'Success',
              text2: 'Using latest data from the selected contact',
              type: 'success',
            });
          }
        })
        .catch(rejectedValueOrSerializedError => {
          Toast.show({
            text1: 'Failed',
            text2: 'Failed to fetch latest data',
            type: 'error',
          });
        });
    }
  }, [contactDetails]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingVertical: 16}}>
      <View style={{alignItems: 'center', marginBottom: 32}}>
        {isValidURL(photo) ? (
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
            }}
            source={{
              uri: photo,
            }}
          />
        ) : (
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
              backgroundColor: '#e9e9e9',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 70}}>
              {getInitial(firstName + ' ' + lastName)}
            </Text>
          </View>
        )}
      </View>
      <View style={{paddingHorizontal: 16, backgroundColor: '#f7f7f7'}}>
        <TextInput
          placeholder={'First name'}
          placeholderTextColor={'grey'}
          value={firstName}
          onChangeText={changeFirstName}
          editable={isEditable}
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
          editable={isEditable}
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
          editable={isEditable}
          style={{color: 'black'}}
          keyboardType={'numeric'}
        />
      </View>
      {isEditable ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '80%',
            alignSelf: 'center',
            bottom: 16,
          }}
          onPress={() => {}}>
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
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '80%',
            alignSelf: 'center',
            bottom: 16,
          }}
          onPress={() => {}}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#BF1E2E',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Edit</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IndexContactDetailsContainer;
