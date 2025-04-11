import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native'
import { supabase } from '../supabase'

const EmployeeListScreen = ({ navigation }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from('employees').select('*')
    if (!error) setEmployees(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigation.replace('SignIn')
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>

      <FlatList
        data={employees}
        keyExtractor={item => item.id?.toString() || `${item.email}-${Math.random()}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.position}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No employees found</Text>}
      />

      <Button title="Log Out" onPress={handleLogout} color="#c92a2a" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f3f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  email: {
    fontSize: 12,
    color: '#555'
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999'
  }
})

export default EmployeeListScreen
