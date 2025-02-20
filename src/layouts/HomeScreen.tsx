import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Surface, Text,IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5'


const menuForm = [
        {
            name:"合格标记",
            icon:"check",
            path:"qualified"
        },
        {
            name:"标记不合格",
            icon:"close",
            path:"unqualified"
        },
        {
            name:"重合格",
            icon:"rotate-right",
            path:"resetQualified"
        },
         {
           name:"移出",
           icon:"expand",
           path:"remove"
         },
          {
            name:"补货",
            icon:"compress",
            path:"replenish"
          }
    ]

export default function HomeScreen({navigation}) {
  return (
     <FlatGrid
           itemDimension={80}
           data={menuForm}
           renderItem={({ item }) => (
             <View style={{ alignItems: 'center' }}>
               <IconButton
                 icon={props => <Icon name={item.icon} {...props} />}
                 size={32}
                 onPress={() =>  navigation.navigate(item.path)}
               />
               <Text variant="labelMedium">{item.name}</Text>
             </View>
           )}
         />
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    marginRight:20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center'
  },
  body: {
      padding: 8,
      flexDirection:'row',
      flex:1,
      alignItems:''
    },
});

