import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function GoalInput({ navigation }) {
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState('');

  const handleMakePlan = () => {
    navigation.navigate('GoalPlan', { goal, days });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your goal"
        value={goal}
        onChangeText={setGoal}
      />
      <Text style={styles.label}>Number of Days</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of days"
        value={days}
        onChangeText={setDays}
        keyboardType="numeric"
      />
      <Button title="Make My Plan" onPress={handleMakePlan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default GoalInput;
