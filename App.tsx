import {View, StyleSheet} from 'react-native';
import React from 'react';
import MultiStepForm from './views/MultipleStepForm';

export default function App() {
  return (
    <View>
      <MultiStepForm />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
