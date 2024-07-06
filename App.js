import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GoalInput from './GoalInput';
import GoalPlan from './GoalPlan';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GoalInput">
        <Stack.Screen name="GoalInput" component={GoalInput} options={{ title: 'Set Your Goal' }} />
        <Stack.Screen name="GoalPlan" component={GoalPlan} options={{ title: 'Your Plan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
