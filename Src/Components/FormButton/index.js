import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';
import {styles} from './style';

const FormButton = ({title, modeValue, ...rest}) => {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}>
      {title}
    </Button>
  );
};

export default FormButton;
