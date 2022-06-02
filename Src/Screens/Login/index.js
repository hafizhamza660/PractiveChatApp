import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import FormInput from '../../Components/FormInput';
import {AuthContext} from '../../Navigation/AuthProvider';
import {commonStyles} from '../../Styles/commonStyles';

const Login = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={commonStyles.container}>
      <Title style={commonStyles.titleText}>Welcome to Chat app</Title>
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
        title="Login"
        modeValue="contained"
        labelStyle={commonStyles.loginButtonLabel}
        onPress={() => login(email, password)}
      />
      <FormButton
        title="New user? Join here"
        modeValue="text"
        uppercase={false}
        labelStyle={commonStyles.navButtonText}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
