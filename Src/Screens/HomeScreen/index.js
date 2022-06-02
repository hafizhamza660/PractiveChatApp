import React, {useContext} from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import {AuthContext} from '../../Navigation/AuthProvider';
import {commonStyles} from '../../Styles/commonStyles';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  return (
    <View style={commonStyles.container}>
      <Title>Home Screen</Title>
      <Title>All chat rooms will be listed here</Title>
      <Title>{user.uid}</Title>
      <FormButton
        modeValue="contained"
        title="Logout"
        onPress={() => logout()}
      />
    </View>
  );
};

export default HomeScreen;
