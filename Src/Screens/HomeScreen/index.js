import React, {useContext, useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Title, List, Divider} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import {AuthContext} from '../../Navigation/AuthProvider';
import {commonStyles} from '../../Styles/commonStyles';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={commonStyles.homecontainer}>
      <FormButton
        title={'Rooms List'}
        modeValue={'contained'}
        onPress={() => navigation.navigate('RoomsList')}
      />
      <View style={commonStyles.firendsView}></View>
    </View>
  );
};

export default HomeScreen;
