import React from 'react';
import {View, TextInput, Text} from 'react-native';

const Form2 = ({formData, setFormData, errors, setErrors}) => {
  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const validateForm2 = () => {
    const {firstName, lastName, address} = formData;
    let valid = true;

    if (!firstName || !firstName.match(/^[A-Za-z]{2,50}$/)) {
      setErrors({...errors, firstName: 'Please enter a valid first name'});
      valid = false;
    } else {
      setErrors({...errors, firstName: ''});
    }

    if (lastName && !lastName.match(/^[A-Za-z]*$/)) {
      setErrors({...errors, lastName: 'Please enter a valid last name'});
      valid = false;
    } else {
      setErrors({...errors, lastName: ''});
    }

    if (!address || address.length < 10) {
      setErrors({
        ...errors,
        address: 'Address must be at least 10 characters long',
      });
      valid = false;
    } else {
      setErrors({...errors, address: ''});
    }

    return valid;
  };

  return (
    <View>
      <Text>First Name:</Text>
      <TextInput
        placeholder="Enter first name"
        value={formData.firstName}
        onChangeText={text => handleChange('firstName', text)}
      />
      <Text style={{color: 'red'}}>{errors.firstName}</Text>

      <Text>Last Name (Optional):</Text>
      <TextInput
        placeholder="Enter last name"
        value={formData.lastName}
        onChangeText={text => handleChange('lastName', text)}
      />
      <Text style={{color: 'red'}}>{errors.lastName}</Text>

      <Text>Address:</Text>
      <TextInput
        placeholder="Enter address"
        value={formData.address}
        onChangeText={text => handleChange('address', text)}
      />
      <Text style={{color: 'red'}}>{errors.address}</Text>
    </View>
  );
};

export default Form2;
