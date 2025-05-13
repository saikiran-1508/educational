import { View, Text, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import colors from '../../colors/constant';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseconfig';
import { UserDetailContext } from '../../context/UserDetailcontext';
import { useContext } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userDetail,setUserDetail} = useContext(UserDetailContext);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Simple email validation
  };

  const CreateNewAccount = async () => {
    if (!fullName || !email || !password) {
      console.error("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      console.error("Invalid email format");
      return;
    }

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const user = resp.user;
      console.log("User created:", user);
      await SaveUser(user);
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  const SaveUser = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    };
    try {
      await setDoc(doc(db, "users", email), data);
      console.log("User saved successfully");
      setUserDetail(data);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/hi.png")} />

      <Text style={styles.title}>Create New Account</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(value) => setFullName(value)} 
        placeholder="Full Name"
      />
      <TextInput 
        style={styles.input} 
        onChangeText={(value) => setEmail(value)} 
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        onChangeText={(value) => setPassword(value)} 
        secureTextEntry={true} 
        placeholder="Password"
      />
      <TouchableOpacity style={styles.button} onPress={CreateNewAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.newText}>
        <Text style={styles.buttonnewText}>Already have an account?</Text>
        <Pressable onPress={() => router.push("/auth/signin")}>
          <Text style={styles.buttonnewnText}>Sign In Here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.WHITE,
    flex: 1,
    alignItems: "center",
    padding: 25,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 35,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonnewText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  newText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonnewnText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
