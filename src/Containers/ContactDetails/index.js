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

const IndexContactDetailsContainer = ({route, navigation}) => {
    const { contactInformation } = routes.params
    useEffect(() => {
        console.log({ route })
    }, [navigation])
  return <View />;
};

export default IndexContactDetailsContainer;
