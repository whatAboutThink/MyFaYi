import React, { useState, useRef } from 'react';
import {Keyboard, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FormRow ({ label, value, onChangeText, onButtonPress, showButton = true, keyboardType, secureTextEntry = false, icon = "center-focus-weak"}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={`请输入${label}`}
        keyboardType={keyboardType || 'default'}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, isFocused && styles.inputFocused]}
      />
      {showButton && (
        <TouchableOpacity
                onPress={() => {
                     isFocused==true?inputRef.current.blur():inputRef.current.focus();
                     onButtonPress(); // 执行按钮逻辑
                    }}
                style={[
                  styles.button,
                  isFocused && styles.activeButton // 条件样式
                ]}
              >
                <Icon
                  name={icon}
                  size={24}
                  color={isFocused ? '#4ae879' : '#666'}
                />
              </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  label: {
    width: 80,
    fontSize: 16,
    color: '#333',
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingRight: 8
  },
  inputFocused: {
      borderWidth: 1,
      borderColor: 'green',
      borderStyle: 'dashed'
      }
});