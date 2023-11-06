import React from 'react';
import {View, TextInput, Text} from 'react-native';

const Form1 = ({formData, setFormData, errors, setErrors}) => {
  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const validateForm1 = () => {
    const {emailId, password} = formData;
    let valid = true;

    if (!emailId || !emailId.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      setErrors({...errors, emailId: 'Please enter a valid email address'});
      valid = false;
    } else {
      setErrors({...errors, emailId: ''});
    }

    if (
      !password ||
      !password.match(
        /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*\W.*\W).{8,}$/,
      )
    ) {
      setErrors({...errors, password: 'Password must meet the requirements'});
      valid = false;
    } else {
      setErrors({...errors, password: ''});
    }

    return valid;
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        placeholder="Enter email"
        value={formData.emailId}
        onChangeText={text => handleChange('emailId', text)}
      />
      <Text style={{color: 'red'}}>{errors.emailId}</Text>

      <Text>Password:</Text>
      <TextInput
        placeholder="Enter password"
        secureTextEntry
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
      />
      <Text style={{color: 'red'}}>{errors.password}</Text>
    </View>
  );
};

export default Form1;
