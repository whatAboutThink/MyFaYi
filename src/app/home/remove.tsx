import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseForm from '../../components/BaseForm'
import { increment, decrement, reset } from '../../store/slices/counter'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()


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
      <Text style={{ fontSize: 30 }}>Count: {count}</Text>
      
      <Button title="加一" onPress={() => dispatch(increment())} />
      <Button title="减一" onPress={() => dispatch(decrement())} />
      <Button title="重置" onPress={() => dispatch(reset())} />
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