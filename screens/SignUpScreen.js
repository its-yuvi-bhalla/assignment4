import React from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../supabase'

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = async values => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password
      })

      if (error) {
        Alert.alert('Sign Up Failed', error.message)
        return
      }

      Alert.alert('Auth Success', 'Now saving profile...')

      const { error: profileError } = await supabase.from('profiles').insert([
        {
          email: values.email,
          full_name: values.fullName
        }
      ])

      if (profileError) {
        Alert.alert('Profile Insert Failed', profileError.message)
      } else {
        Alert.alert('Success', 'User signed up & profile saved!')
        navigation.replace('Employees')
      }
    } catch (err) {
      Alert.alert('Unexpected Error', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{ fullName: '', email: '', password: '' }}
        validationSchema={Yup.object({
          fullName: Yup.string().required('Full name is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().min(6, 'Min 6 characters').required('Password is required')
        })}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button title="Sign Up" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <Button
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate('SignIn')}
        color="#6c757d"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 12
  }
})

export default SignUpScreen
