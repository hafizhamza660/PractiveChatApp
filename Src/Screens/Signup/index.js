import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {Title, IconButton} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import FormInput from '../../Components/FormInput';
import {AuthContext} from '../../Navigation/AuthProvider';
import {commonStyles} from '../../Styles/commonStyles';

const Signup = ({navigation}) => {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={commonStyles.container}>
      <Title style={commonStyles.titleText}>Register to chat</Title>
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <FormButton
        title="Signup"
        modeValue="contained"
        labelStyle={commonStyles.loginButtonLabel}
        onPress={() => register(email, password)}
      />
      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={commonStyles.navButton}
        color="#6646ee"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Signup;
