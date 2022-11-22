import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import StorybookScreen from '../screens/StorybookScreen';
import { BottomTabParamList, RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const Tabs = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="md-home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Storybook"
        component={StorybookScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="md-book-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}