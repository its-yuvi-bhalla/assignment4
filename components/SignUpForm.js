import React from 'react'
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../supabase'

const SignUpForm = ({ onSuccess }) => {
  const handleSignUp = async values => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    })

    if (error) {
      Alert.alert('Sign Up Failed', error.message)
    } else {
      Alert.alert('Success', 'Account created. Please check your email.')
      onSuccess()
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6).required('Required')
      })}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            value={values.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            value={values.password}
          />
          <Button title="Sign Up" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10
  }
})

export default SignUpForm