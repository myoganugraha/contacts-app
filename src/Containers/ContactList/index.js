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
} from 'react-native';

import FetchAllContacts from '@/Store/Contact/FetchAllContacts';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { navigate } from '@/Navigators/Root'

const IndexContactListContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contact.item);
  const contactListIsLoading = useSelector(
    state => state.contact.fetchAllContacts.loading,
  );

  useEffect(() => {
    dispatch(FetchAllContacts.action());
  }, [navigation]);
 
  function validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    return !!pattern.test(str);
  }

  function getInitial(name) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={contactListIsLoading}
            onRefresh={() => {
              dispatch(FetchAllContacts.action());
            }}
          />
        }>
        {contactList && !contactListIsLoading && contactList.data && contactList.data.length > 0 ? (
          contactList.data.map((data, i) => {
            return (
              <TouchableOpacity onPress={() => {
                navigate('Contact Details', {contactInformation: data})
              }} key={i}>
                <View
                  style={{
                    backgroundColor: 'white',
                    marginTop: (i = 0 ? 2 : 8),
                    marginBottom: (i = contactList.data.length - 1 ? 2 : 0),
                    borderRadius: 8,
                    marginHorizontal: 16,
                    padding: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {validURL(data.photo) ? (
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 16,
                      }}
                      source={{
                        uri: data.photo,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#E8E8E8',
                        marginRight: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>
                        {getInitial(data.firstName + ' ' + data.lastName)}
                      </Text>
                    </View>
                  )}
                  <View>
                    <Text style={{fontWeight: '600', fontSize: 18}}>
                      {data.firstName + ' ' + data.lastName}
                    </Text>
                    <Text style={{}}>{'Age : ' + data.age}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View />
        )}
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {navigate('Add Contact')}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#ee6e73',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        ><Icon size={40} color="white" name="add" /></View>
      </TouchableOpacity>
    </View>
  );
};

export default IndexContactListContainer;
