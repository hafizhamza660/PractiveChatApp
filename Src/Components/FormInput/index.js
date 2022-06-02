import React from 'react';
import {TextInput} from 'react-native-paper';
import {styles} from './style';

const FormInput = ({labelName, ...rest}) => {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      {...rest}
    />
  );
};

export default FormInput;
