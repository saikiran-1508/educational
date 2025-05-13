import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import colors from '@/colors/constant'
import NoCourse from '@/components/NoCourse'
export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <NoCourse />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    paddingTop: Platform.OS == 'ios' && 45,
    flex:1,
    backgroundColor: colors.white
  },
})