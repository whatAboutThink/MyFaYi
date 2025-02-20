import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/layouts/HomeScreen";
import SettingScreen from "./src/layouts/SettingScreen";
import SelfScreen from "./src/layouts/SelfScreen";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import Qualified from "./src/app/home/qualified";
import unQualified from "./src/app/home/unqualified";
import resetQualified from "./src/app/home/resetQualified";
import remove from "./src/app/home/remove";
import replenish from "./src/app/home/replenish";


//初始化基础路由
const Stack = createStackNavigator(); //基础路由
const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  return (
      <NavigationContainer>
        <Stack.Navigator mode="modal">
            <Stack.Screen name="home" options={{title:'主体',headerShown: false}} component={BottomTabNavigator} />
            <Stack.Screen name="SelfScreen" options={{title:'用户列表'}} component={SelfScreen}/>
            <Stack.Screen name="allBill" options={{title:'所有订单'}} component={SelfScreen}/>
            <Stack.Screen name="qualified" options={{title:'合格登记'}} component={Qualified}/>
            <Stack.Screen name="resetQualified" options={{title:'重登记合格'}} component={resetQualified}/>
            <Stack.Screen name="unqualified" options={{title:'不合格登记'}} component={unQualified}/>
            <Stack.Screen name="remove" options={{title:'移出'}} component={remove}/>
            <Stack.Screen name="replenish" options={{title:'补货'}} component={replenish}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}

export default App;