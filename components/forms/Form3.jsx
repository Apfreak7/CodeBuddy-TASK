import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Form3 = ({formData, setFormData, errors, setErrors}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const validateForm3 = () => {
    const {countryCode, phoneNumber, acceptTerms} = formData;
    let valid = true;
    const errors = {};

    if (!countryCode) {
      errors.countryCode = 'Please select a valid country code';
      valid = false;
    } else {
      errors.countryCode = '';
    }

    if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
      valid = false;
    } else {
      errors.phoneNumber = '';
    }

    if (!acceptTerms) {
      errors.acceptTerms = 'Please accept the terms and conditions';
      valid = false;
    } else {
      errors.acceptTerms = '';
    }

    setErrors(errors);
    return valid;
  };

  const countryOptions = [
    {label: 'Select Country Code', value: null},
    {label: 'India (+91)', value: '+91'},
    {label: 'America (+1)', value: '+1'},
  ];

  const handleOptionSelect = option => {
    setCountryCode(option);
    handleChange('countryCode', option.value);
    setShowDropdown(false);
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms(acceptTerms);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.dropdownText}>
          {countryCode ? countryCode.label : 'Select Country Code'}
        </Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownOptions}>
          {countryOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionSelect(option)}>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={{color: 'red'}}>{errors.countryCode}</Text>

      <Text>Phone Number:</Text>
      <TextInput
        placeholder="Enter phone number"
        value={formData.phoneNumber}
        onChangeText={text => handleChange('phoneNumber', text)}
      />
      <Text style={{color: 'red'}}>{errors.phoneNumber}</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[
            styles.customCheckbox,
            {backgroundColor: acceptTerms ? 'green' : 'white'},
          ]}
          onPress={handleAcceptTermsChange}>
          {acceptTerms && <Text style={styles.customCheckboxIcon}>✓</Text>}
        </TouchableOpacity>
        <Text>I accept the terms and conditions</Text>
      </View>
      <Text style={{color: 'red'}}>{errors.acceptTerms}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    padding: 10,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  customCheckboxIcon: {
    color: 'white',
  },
});

export default Form3;
