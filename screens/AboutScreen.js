import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// about screen
export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>Full Name: Jaskiran Gill</Text>
      <Text style={styles.text}>Student ID: 101458336</Text>
    </View>
  );
}

// ux ui handling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
