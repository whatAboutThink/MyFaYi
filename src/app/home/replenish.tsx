import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseForm from '../../components/BaseForm'


const App = () => {
  const [formData, setFormData] = useState({
    shelve: {value: "", active: false},
    work: {value: "", active: false}
  });

  const [activeField, setField] = useState({
    fieldName: ""
  })

  const handleButtonPress = (fieldName) => {
      if(fieldName == activeField.fieldName){
          setFormData(prev => ({
            ...prev,
            [fieldName]: {
              value:"",
              active: !prev[fieldName].active // 切换激活状态
            }
          }));
          setField(prev => (
            {
                ...prev,
                fieldName:""
                }
          ))
      }else{
        setFormData(prev => ({
          ...prev, // 保留其他字段不变
          shelve: {
            ...prev.shelve, // 保留 birthday 的其他属性
            active: false // 只修改 active 属性
          },
          work: {
            ...prev.work,
            active: false
          }
        }));
        // 扫码处理后传递结果
        setFormData(prev => ({
           ...prev,
           [fieldName]: {
             value:"",
             active: !prev[fieldName].active // 切换激活状态
           }
         }));
         setField(prev => (
           {
               ...prev,
               fieldName:fieldName
               }
         ))
      }

    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BaseForm
        label="货架编号"
        value={formData.shelve.value}
        onChangeText={(text) => setFormData({ ...formData, shelve: text })}
        isActive={formData.shelve.active}
        onButtonPress={() => handleButtonPress('shelve')}
      />

      <BaseForm
        label="工位编码"
        value={formData.work.value}
        onChangeText={(text) => setFormData({ ...formData, work: text })}
        onButtonPress={() => handleButtonPress('work')}
        isActive={formData.work.active}
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