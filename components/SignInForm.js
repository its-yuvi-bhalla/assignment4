import React from 'react'
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../supabase'

const SignInForm = ({ onSuccess }) => {
  const handleSignIn = async values => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      onSuccess()
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
      })}
      onSubmit={handleSignIn}
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
          <Button title="Sign In" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#fff'
  }
})

export default SignInForm