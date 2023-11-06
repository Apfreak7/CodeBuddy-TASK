import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import Form1 from '../components/forms/Form1';
import Form2 from '../components/forms/Form2';
import Form3 from '../components/forms/Form3';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const [submittedData, setSubmittedData] = useState(null);

  const validateForm1 = () => {
    const {emailId, password} = formData;
    let valid = true;
    const errors = {};

    if (!emailId || !emailId.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      errors.emailId = 'Please enter a valid email address';
      valid = false;
    }

    if (
      !password ||
      !password.match(
        /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*\W.*\W).{8,}$/,
      )
    ) {
      errors.password = 'Password must meet the requirements';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const validateForm2 = () => {
    const {firstName, lastName, address} = formData;
    let valid = true;
    const errors = {};

    if (!firstName || !firstName.match(/^[A-Za-z]{2,50}$/)) {
      errors.firstName = 'Please enter a valid first name';
      valid = false;
    }

    if (lastName && !lastName.match(/^[A-Za-z]*$/)) {
      errors.lastName = 'Please enter a valid last name';
      valid = false;
    }

    if (!address || address.length < 10) {
      errors.address = 'Address must be at least 10 characters long';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const validateForm3 = () => {
    const {countryCode, phoneNumber, acceptTerms} = formData;
    let valid = true;
    const errors = {};

    if (!countryCode || (countryCode !== '+91' && countryCode !== '+1')) {
      errors.countryCode = 'Please select a valid country code';
      valid = false;
    }

    if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    if (acceptTerms) {
      errors.acceptTerms = 'Please accept the terms and conditions';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSaveAndNext = () => {
    if (currentStep === 1) {
      const isValid = validateForm1();
      if (isValid) {
        setCurrentStep(2);
        setErrors({});
      }
    } else if (currentStep === 2) {
      const isValid = validateForm2();
      if (isValid) {
        setCurrentStep(3);
        setErrors({});
      }
    }
  };

  const handleSave = () => {
    if (currentStep === 1) {
      const isValid = validateForm1();
      if (isValid) {
        // Save Form1 data
      }
    } else if (currentStep === 2) {
      const isValid = validateForm2();
      if (isValid) {
        // Save Form2 data
      }
    } else if (currentStep === 3) {
      const isValid = validateForm3();
      if (isValid) {
        // Save Form3 data and show the modal
        setModalVisible(true);

        // Store the submitted data
        setSubmittedData(formData);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View>
        {currentStep === 1 && (
          <Form1
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {currentStep === 2 && (
          <Form2
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {currentStep === 3 && (
          <Form3
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        <Button
          title="Back"
          disabled={currentStep === 1}
          onPress={() => setCurrentStep(currentStep - 1)}
        />

        <Button title="Save" onPress={handleSave} />

        <Button
          title="Save and Next"
          disabled={currentStep === 3}
          onPress={handleSaveAndNext}
        />

        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Data Submitted:</Text>
              <Text>{JSON.stringify(submittedData, null, 2)}</Text>
              <Button
                title="Close"
                onPress={closeModal}
                style={styles.closeModalButton}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeModalButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    color: 'blue',
  },
});

export default MultiStepForm;
