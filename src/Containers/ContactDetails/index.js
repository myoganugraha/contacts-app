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
import UpdateContactData from '@/Store/Contact/UpdateContactData';
import {getInitial, isValidURL} from '@/Function';
import {unwrapResult} from '@reduxjs/toolkit';

import {navigateAndSimpleReset} from '@/Navigators/Root';

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
  const updateContactDataIsLoading = useSelector(
    state => state.contact.updateContactData.loading,
  );

  useEffect(() => {
    dispatch(ResetContactDetails.action());
  }, [navigation]);

  useEffect(() => {
    if (contactDetails == null) {
      getLatestData();
    }
  }, [contactDetails]);

  getLatestData = () => {
    dispatch(FetchContactDetails.action(contactInformation.id))
      .then(unwrapResult)
      .then(originalPromiseResult => {
        console.log({originalPromiseResult});
        if (originalPromiseResult.data) {
          changeFirstName(originalPromiseResult.data.firstName);
          changeLastName(originalPromiseResult.data.lastName);
          changeAge(originalPromiseResult.data.age.toString());
          changePhoto(originalPromiseResult.data.photo);
        }
      })
      .catch(rejectedValueOrSerializedError => {});
  };

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
          onPress={() => {
            let payload = {
              id: contactInformation.id,
              newData: {
                firstName: firstName,
                lastName: lastName,
                age: age,
                photo: photo,
              },
            };
            dispatch(UpdateContactData.action(payload))
              .then(originalPromiseResult => {
                console.log({originalPromiseResult});
                changeIsEditable(false);
                Toast.show({
                  text1: 'Updated',
                  text2: 'Contact successfully updated',
                  type: 'success',
                });
                getLatestData();
                setTimeout(() => {
                  navigateAndSimpleReset('Contact List');
                }, 500);
              })
              .catch(rejectedValueOrSerializedError => {
                console.log({rejectedValueOrSerializedError});
                changeIsEditable(false);
                getLatestData();
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
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '80%',
            alignSelf: 'center',
            bottom: 16,
          }}
          onPress={() => {
            changeIsEditable(true);
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#F47820',
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
