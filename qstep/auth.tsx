
import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { supabase } from '../services/supabaseClient';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          contact_number: contactNumber,
        }
      }
    });

    if (error) Alert.alert(error.message);
    else Alert.alert('Signed up successfully!', 'Please check your email to verify your account.');
    setLoading(false);
  }

  async function handleOAuthLogin(provider) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
    });
    if (error) {
        Alert.alert(error.message);
    }
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>Your Logo</Text>
        </View>
        <Text style={styles.title}>Welcome to <Text style={styles.brand}>QSTEP</Text></Text>
        <Text style={styles.subtitle}>{isLogin ? 'Sign in' : 'Sign up'}</Text>

        <View style={styles.socialContainer}>
            <TouchableOpacity onPress={() => handleOAuthLogin('google')} style={[styles.socialButton, {backgroundColor: '#db4437'}]}>
                <Text style={styles.socialButtonText}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOAuthLogin('facebook')} style={[styles.socialButton, {backgroundColor: '#3b5998'}]}>
                <Text style={styles.socialButtonText}>f</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={() => handleOAuthLogin('github')} style={[styles.socialButton, {backgroundColor: '#333'}]}>
                <Text style={styles.socialButtonText}>Git</Text>
            </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username or email address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="User name"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={contactNumber}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </View>

        <TouchableOpacity onPress={isLogin ? signInWithEmail : signUpWithEmail} disabled={loading} style={styles.button}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Sign up')}</Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text>{isLogin ? "No Account?" : "Have an Account?"}</Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>{isLogin ? 'Sign up' : 'Sign in'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  authContainer: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  brand: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    borderRadius: 999,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    boxSizing: 'border-box',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#2E8B57',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#2E8B57',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  toggleText: {
    color: '#2E8B57',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default Auth;
