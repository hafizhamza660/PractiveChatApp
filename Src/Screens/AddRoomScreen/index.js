import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import FormInput from '../../Components/FormInput';
import {commonStyles} from '../../Styles/commonStyles';
import firestore from '@react-native-firebase/firestore';

const AddRoomScreen = ({navigation}) => {
  const [roomName, setRoomName] = useState('');
  // ... Firestore query will come here later
  const handleButtonPress = () => {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
        })
        .then(() => {
          navigation.navigate('Home');
        });
    }
  };
  return (
    <View style={commonStyles.rootContainer}>
      <View style={commonStyles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={commonStyles.innerContainer}>
        <Title style={commonStyles.titleText}>Create a new chat room</Title>
        <FormInput
          labelName="Room Name"
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Create"
          modeValue="contained"
          labelStyle={commonStyles.loginButtonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
};

export default AddRoomScreen;
