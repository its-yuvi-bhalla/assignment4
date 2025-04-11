import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../supabase'

const SignInScreen = ({ navigation }) => {
  const handleSignIn = async values => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) {
      Alert.alert('Login Failed', error.message)
      return
    }

    const user = data?.user
    if (!user) {
      Alert.alert('Login Failed', 'No user returned')
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError) {
        Alert.alert('Login Successful', 'Welcome!')
    } else if (profile) {
        Alert.alert('Login Successful', `Welcome, ${profile?.full_name || 'User'}!`)
    }

    navigation.replace('Employees')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
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

            <Button title="Sign In" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
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

export default SignInScreen