import React, {useState, useContext} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Title, IconButton} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import FormInput from '../../Components/FormInput';
import {AuthContext} from '../../Navigation/AuthProvider';
import {commonStyles} from '../../Styles/commonStyles';
import {launchImageLibrary} from 'react-native-image-picker';

const Signup = ({navigation}) => {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState({});

  const chooseFile = async () => {
    let options = {
      title: 'Select Image',
      mediaType: 'photo',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // ImagePicker.launchImageLibrary(options, response => {
    //   console.log('Response = ', response);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     setFilePath(response);
    //   }
    // });
    const result = await launchImageLibrary(options);
    console.log(result);
    setImageUrl(result);
    // return result;
  };

  return (
    <View style={commonStyles.container}>
      <Title style={commonStyles.titleText}>Register to chat</Title>
      <FormInput
        labelName="Name"
        value={name}
        autoCapitalize="none"
        onChangeText={userName => setName(userName)}
      />
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

      <Image
        source={{uri: 'data:image/jpeg;base64,' + imageUrl.uri}}
        style={styles.imageStyle}
        resizeMode={'cover'}
      />
      <FormButton
        title="Select Image"
        modeValue="outlined"
        labelStyle={{...commonStyles.loginButtonLabel, fontSize: 15}}
        onPress={chooseFile}
      />

      <FormButton
        title="Signup"
        modeValue="contained"
        labelStyle={commonStyles.loginButtonLabel}
        onPress={() => register(email, password, name, imageUrl)}
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

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },
});
export default Signup;
