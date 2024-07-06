import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import genAI from 'some-genai-library'; // Replace with the actual import from the GenAI library
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCazJEmpYATyI34DZUKsHfwIoFq94yGALI");

// GoogleGenerativeAI.configure(api_key="AIzaSyCazJEmpYATyI34DZUKsHfwIoFq94yGALI")
function GoalPlan({ route }) {
  const { goal, days } = route.params;
  const numDays = parseInt(days, 10);

  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      let prompt = `
        Create a detailed plan for the goal "${goal}" for ${numDays} days. Provide specific tasks or actions to be done each day. Use this JSON schema:
        { "type": "array", "items": { "type": "object", "properties": { "day": { "type": "number" }, "task": { "type": "string" } } } }
      `;

      try {
        let result = await model.generateContent(prompt);
        let generatedPlan = JSON.parse(result.response.text());
        setPlan(generatedPlan);
        setLoading(false);
      } catch (error) {
        console.error("Error generating plan:", error);
        setLoading(false);
      }
    };

    fetchPlan();
  }, [goal, numDays]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Plan</Text>
      <FlatList
        data={plan.map(({ day, task }) => ({ key: `Day ${day}: ${task}` }))}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default GoalPlan;
