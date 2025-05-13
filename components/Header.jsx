import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { UserDetailContext } from '../context/UserDetailcontext';
import colors from '../colors/constant';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
    const {userDetail,setUserDetail} = useContext(UserDetailContext)
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text style={styles.headerText}>Hello, {userDetail?.name}</Text>
        <Text style={styles.subText}>Let's get started</Text>
      </View>
      <TouchableOpacity >
      <Ionicons name="settings-outline" size={32} color="black" />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 17,
        color: colors.gray,
    }
})