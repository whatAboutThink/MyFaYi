import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseForm from '../../components/BaseForm'


const App = () => {
  const [formData, setFormData] = useState({
    shelve: {value: ""},
    work: {value: ""}
  });



  const handleButtonPress = (fieldName) => {
          setFormData(prev => ({
            ...prev,
            [fieldName]: {
              value:"",

            }
          }))
      };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BaseForm
        label="货架编号"
        value={formData.shelve.value}
        onChangeText={(text) => setFormData({ ...formData, shelve: text })}
        onButtonPress={() => handleButtonPress('shelve')}
      />

      <BaseForm
        label="工位编码"
        value={formData.work.value}
        onChangeText={(text) => setFormData({ ...formData, work: text })}
        onButtonPress={() => handleButtonPress('work')}
      />
      <Button title="确定"
                color="#5af07e">
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  button: {
    padding: 8,
    marginLeft: 8
  }
});

export default App;