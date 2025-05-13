import { View, Text, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import colors from '../../colors/constant';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';
import { UserDetailContext } from '../../context/UserDetailcontext';
import { db } from '../../config/firebaseconfig';
import { getDoc, doc } from 'firebase/firestore';


export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSignInClick = () => {
    if (!email || !password) {
      console.log('Please fill in both fields.');
      ToastAndroid.show('Please fill in both fields.', ToastAndroid.SHORT);
      return;
    }
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log('User signed in:', user);
        await getUserDetail();
        setIsLoading(false);
        router.replace('/(tabs)/home');
      })
      .catch((err) => {
        console.log('Sign-in error:', err.message);
        ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
        setIsLoading(false);
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    console.log(result.data());
    setUserDetail(result.data());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/hi.png')} />
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity style={styles.button} onPress={onSignInClick} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="large" color={colors.WHITE} /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>
      <View style={styles.newText}>
        <Text style={styles.buttonNewText}>Don't have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signup')}>
          <Text style={styles.buttonNewnText}> Create Account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    padding: 25,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 35,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    width: '100%',
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonNewText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonNewnText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
