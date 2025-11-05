
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Dashboard!</Text>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },
});

export default Dashboard;
