import { StyleSheet } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../types';
import { Text, View } from '../components/Themed';

const HomeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<BottomTabParamList, 'HomeScreen'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Divvly Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
