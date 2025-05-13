import { View, Text, StyleSheet, TextInput, Alert, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import colors from '../../colors/constant';
import Button from '../../components/shared/button';
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AImodel';
import Prompt from '../../colors/prompt';  // ✅ No curly braces

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [topic, setTopic] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  // ✅ Generate Topics
  const onGenerateTopic = async () => { 
    if (!userInput.trim()) {
      Alert.alert("Error", "❌ Please enter a topic");
      return;
    }

    try {
      setLoading(true);
      const PROMPT = userInput + Prompt.IDEA;
      const topicidea = await GenerateTopicsAIModel(PROMPT);

      if (Array.isArray(topicidea)) {
        setTopic(topicidea);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      console.error("❌ Error generating topics:", error);
      Alert.alert("Error", "Failed to generate topics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Select/Deselect Topics
  const ontopicselect = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((item) => item !== topic)
        : [...prevTopics, topic]
    );
  };

  const istopicselected = (topic) => selectedTopics.includes(topic);

  // ✅ Generate Course
  const onGenerateCourseA = async () => {
    if (selectedTopics.length === 0) {
      Alert.alert("Error", "❌ Please select at least one topic");
      return;
    }

    try {
      setLoading(true);
      const prompt = selectedTopics.join(", ") + Prompt.COURSE;
      const aiResp = await GenerateCourseAIModel(prompt);
      console.log("AI Response:", aiResp);

      if (Array.isArray(aiResp)) {
        console.log("✅ Course Content:", aiResp);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      console.error("❌ Error generating course:", error);
      Alert.alert("Error", "Failed to generate course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.scrollContainer} 
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create New Course</Text>
        <Text style={styles.subtitle}>What do you want to learn today?</Text>

        <Text style={styles.label}>
          What course do you want to create? (e.g., Python, React, Digital Marketing)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="(e.g., Python, React, Learn 12th Chemistry)"
          numberOfLines={3}
          multiline={true}
          value={userInput}
          onChangeText={setUserInput}
        />

        <Button 
          text={'Generate Topic'} 
          type={'outline'} 
          onPress={onGenerateTopic} 
          loading={loading} 
        />

        <View style={styles.topicContainer}>
          <Text style={styles.topicText}>Select all topics which you want to add in the course</Text>
          <View style={styles.topicContainernew}>
            {topic.length > 0 ? topic.map((item, index) => (
              <Pressable 
                key={index} 
                onPress={() => ontopicselect(item)}
                style={[
                  styles.topicPill,  
                  istopicselected(item) && { backgroundColor: colors.PRIMARY }
                ]}
              >
                <Text style={{ color: istopicselected(item) ? colors.WHITE : colors.GREY }}>
                  {item}
                </Text>
              </Pressable>
            )) : (
              <Text style={{ color: colors.GREY }}>No topics generated yet.</Text>
            )}
          </View>
        </View>

        {selectedTopics.length > 0 && (
          <Button text={'Create Course'} onPress={onGenerateCourseA} loading={loading} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: colors.WHITE,
    flexGrow: 1
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 25,
    marginTop: 10
  },
  label: {
    fontSize: 19,
    marginTop: 4,
    color: colors.GREY
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    height: 100,
    marginTop: 5,
    textAlignVertical: 'top',
    color: colors.GREY,
    fontSize: 18
  },
  topicContainer: {
    marginTop: 15,
  },
  topicText: {  
    fontSize: 20,
    fontWeight: 'bold',
  },
  topicPill: {  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.GREY,
    margin: 5,
    backgroundColor: colors.WHITE,
  },
  topicContainernew: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
    marginTop: 0,
  },
  button: {
    marginBottom: 15,
  }
});