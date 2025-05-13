import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Button from './shared/button';
import { useRouter } from 'expo-router';
import colors from '../colors/constant';


export default function NoCourse() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/book.png')} style={styles.image} />
      <Text style={styles.text}>You Don't Have Any Course</Text>
      <View style={styles.buttonContainer}>
        <Button 
          text="+Create New Course" 
          onPress={() => router.push('/AddCourse')} // ✅ fixed route name
        />
        <Button 
          text="Explore Existing Course" 
          type="fill"
          onPress={() => router.push('/(tabs)/explore')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: colors.PRIMARY
  }
});
