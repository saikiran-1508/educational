import { Image, SafeAreaView, Text, View,StyleSheet, TouchableOpacity} from "react-native";
import colors from "../colors/constant";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { UserDetailContext } from "@/context/UserDetailcontext";
import { useContext } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";

export default function Index() {
  const router = useRouter();
  const {userDetail,setUserDetail} = useContext(UserDetailContext);

  onAuthStateChanged(auth,async(user)=>{
    if(user){
      console.log(user);
      const result = await getDoc(doc(db,"users",user?.email));
      setUserDetail(result.data());
      router.replace('/(tabs)/home');
    }
  }); 


  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image}
        source={require("../assets/images/landing.png")}/>
        <View style={styles.titleback}>
          <Text style={styles.title}>Welcome to Your Growth Journey!</Text>
          <Text style={styles.subtitle}>
            We're here to help you achieve your goals and become the best version of yourself.
          </Text>

          <TouchableOpacity style={styles.button}
          onPress={() => router.push("/auth/signup")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={() => router.push("/auth/signin")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    marginTop: 70,
  },
  container: {
    backgroundColor: colors.WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.WHITE,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  titleback: {
    padding: 20,
    backgroundColor: colors.PRIMARY,
    height: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  subtitle: {
    fontSize: 20,
    color: colors.WHITE,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
  },
});